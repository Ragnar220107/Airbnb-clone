import express, { response } from "express";
   import passport from "passport";
import { saveRedirecturl } from "../middleware/authenticate.js";
import { asyncwrap } from "../utils/wrapAsync.js";
import  *as userController  from "../controller/users.js";
  const router= express.Router();
  router.route('/signup')
   .get(userController.userSignup)
   .post(asyncwrap(userController.newUser));
    router.route('/login')
    .get(userController.userLogin)
    .post(saveRedirecturl, passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),
   asyncwrap(userController.loginPost));
router.get("/logout", userController.userLogout);

    export default router;
