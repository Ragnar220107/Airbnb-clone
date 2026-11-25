  import listing from "../models/listing.js";
const isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let foundlisting= await listing.findById(id);
    if(!foundlisting.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not te owener");
       return res.redirect(`/listings/${id}`);
    }
    next();
}
export default isOwner;