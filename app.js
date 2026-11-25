 import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import path from "path";
 import methodOverride from "method-override";
 import ejsMate from "ejs-mate";
 import ExpressError from './utils/ExpressError.js'
 import Listing1 from "./routes/listing.js" ;
 import Userrouter from "./routes/user.js";
 import Review1 from "./routes/review.js" ;
 import session from "express-session";
 import flash from "connect-flash";
 import passport from "passport";
 import LocalStratergy from "passport-local";
   import User from "./models/user.js";
   import MongoStore from 'connect-mongo'
 const app = express();
   const dbUrl=process.env.ATLASUSER_TOKEN;
 const store= MongoStore.create({
    mongoUrl:dbUrl,
 crypto:{
    secret:process.env.SECRET,
 },
 touchAfter:24*60*60,
 });
 store.on("error",()=>{
  console.log("Error creating MongoStore");
 });
 app.use(session({
    store:store,        
     secret:process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     cookie:{ 
        expires:Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
httpOnly:true
}
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStratergy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride("_method"));
 app.set(("view engine","ejs"));
 app.use(express.static(path.join(import.meta.dirname,"public")));
 app.set("views",path.join(import.meta.dirname,"views"));
 app.engine("ejs",ejsMate);
async function main() {
    await mongoose.connect(dbUrl);
};
main()
    .then((res)=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    });

let port = 8080;
 app.use(flash());
 app.use((req,res,next)=>{
      res.locals.sucess=req.flash("success");
      res.locals.error=req.flash("error");
      res.locals.currUser=req.user;
 next();
 })

app.use("/listings", Listing1);
app.use("/listings/:id/reviews", Review1);
app.use("/",Userrouter);
app.get("/demoUser", async(req,res)=>{
    let fakeUser= new User({
        email:"abc@gmail.com",
        username:"abc"
    })
    let registeredUser= await User.register(fakeUser, "abcdefg");
    res.send(registeredUser);
})

app.all("{*paths}",(req,res, next)=>{
    next(new ExpressError(405,"ffsv"))
});
app.use((err,req,res,next)=>{
    let {statuscode=400,message="fankas"}=err;
    res.status(statuscode).render("error.ejs",{message});
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})