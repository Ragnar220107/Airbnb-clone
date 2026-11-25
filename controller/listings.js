import listing from "../models/listing.js";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
const mapBoxToken = process.env.MAP_TOKEN; 
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
export const index = async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listing/listing.ejs", { alllistings });
};
export const showListing = async(req,res)=>{
        let {id} = req.params;
        const listingdata = await listing.findById(id).populate({path:"review", populate:{path:"author"}}).populate("owner");
        if(!listingdata){
            req.flash("error","listing does not exist");
         return res.redirect("/listings");
        }
        res.render("listing/listingdetails.ejs",{listingdata})
    
};
export const newListing = async (req, res, next) => {
   let response= await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
 let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new listing(req.body.listing); // FIXED: lowercase 'l'
    newlisting.owner= req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry = response.body.features[0].geometry;
    let savedListing = await newlisting.save();
    console.log(savedListing);
    req.flash("success", "registered");
    res.redirect('/listings');
};
export const editListing =async(req,res)=>{
    let {id} = req.params;
    const listingdata = await listing.findById(id).populate("review");
    if(!listingdata){
            req.flash("error","listing does not exist");
         return res.redirect("/listings");
        }
        let orignalImg= listingdata.image.url;
        orignalImg.replace("/upload","/upload/w_200");
    res.render("listing/edit.ejs",{listingdata,orignalImg})
};
export const updateListing = async (req, res) => {
    let { id } = req.params;
    const listingData = req.body.listing || req.body.Listing;

    let updatelisting = await listing.findByIdAndUpdate(
        id,
        { ...listingData },
        { runValidators: true, new: true }
    );

    // Re-geocode if location is present and geometry is missing or changed
    if (updatelisting.location && (!updatelisting.geometry || !updatelisting.geometry.type || req.body.listing?.location)) {
        let response = await geocodingClient.forwardGeocode({
            query: updatelisting.location,
            limit: 1
        }).send();

        if (response.body.features.length > 0) {
            updatelisting.geometry = response.body.features[0].geometry;
        }
    }

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatelisting.image = { url, filename };
    }

    await updatelisting.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};
export const deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    console.log(deletedlisting);
    return res.redirect('/listings');
};