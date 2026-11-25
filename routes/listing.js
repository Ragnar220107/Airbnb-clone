import express from "express";
 import {asyncwrap} from '../utils/wrapAsync.js'
  import listing from "../models/listing.js";
    import ExpressError from '../utils/ExpressError.js';
    import {listingschema} from '../schema.js';
    import isloggedin from "../middleware/authenticate.js";
    import isOwner from "../middleware/isowner.js";
const router= express.Router();
import * as listingController from "../controller/listings.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload= multer({storage: storage});
let validatelisting = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
router.route('/')
.get(asyncwrap(listingController.index))
.post(isloggedin,upload.single('listing[image]'),validatelisting,asyncwrap(listingController.newListing));
router.get('/new',isloggedin,(req,res)=>{
  res.render("listing/newlisting.ejs")
    });
  
    // read page
    router.route('/:id')
    .get(asyncwrap(listingController.showListing))
.put(isloggedin,upload.single('listing[image]'),isOwner,asyncwrap( listingController.updateListing))
.delete(isloggedin, isOwner, asyncwrap(listingController.deleteListing))
router.get('/:id/edit',isloggedin,isOwner,asyncwrap(listingController.editListing));
export default router;
