import listing from "../models/listing.js";
 import Review from "../models/review.js";

export const createReview = async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    Listing.review.push(newReview);
await newReview.save();
await Listing.save();
res.redirect(`/listings/${req.params.id}`);

    }