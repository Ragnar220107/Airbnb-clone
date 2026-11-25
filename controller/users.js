  import User from "../models/user.js";

  export const userSignup=(req,res)=>{
  res.render("user/user.ejs")
    };
    export const newUser=async(req,res)=>{
          try{
            let {email, username,password}=req.body;
            let newUser= new User({email,username});
            let registeredUser= await User.register(newUser,password);
            req.login(registeredUser,(err)=>{
    if(err){
      return next(err);
    }
      req.flash("success","Welcome to Air-Bnb");
           return res.redirect("/listings");
            })
            console.log(registeredUser);
          }catch(e){
            req.flash("error","Username already exist");
            res.redirect("/signup");
          }
        };
        export const userLogin=(req,res)=>{
      res.render("user/login.ejs");
    };
    export const loginPost= async (req,res)=>{
      req.flash("success","WelcomeBack to Air-Bnd");
      let redirectUrl= res.locals.redirectUrl || "/listings";
       res.redirect(redirectUrl);

    };
    export const userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out");
        res.redirect("/listings");
    });
};