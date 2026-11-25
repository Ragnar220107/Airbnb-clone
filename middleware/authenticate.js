const isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.orignalUrl;
        req.flash("error","You must log-in first");
        return res.redirect("/login")
    }
    next();
}
export const saveRedirecturl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
export default isloggedin;