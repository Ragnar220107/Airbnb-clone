import express from "express";
import { reviewschema} from '../schema.js'
import ExpressError from '../utils/ExpressError.js'

import isloggedin from "../middleware/authenticate.js";
import {asyncwrap} from '../utils/wrapAsync.js';
import * as reviewController from "../controller/reviews.js";

const router= express.Router({mergeParams:true});

// FIXED: Validate review middleware checks 'if (error)' first
let validatereview = (req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
router.post("/",isloggedin,validatereview,asyncwrap(reviewController.createReview));
export default router;