  var express = require("express");
  var router = express.Router();
  var User = require("../models/user");
  var passport = require("passport");
  
  //root route
router.get("/",function(req,res) {
   res.render("landing"); 
});
//AUTH ROUTES

//show register form
router.get("/register",function(req,res){
    res.render("register");
});
//handle sign up logic

router.post("/register",function(req,res) {
    var newUser = new User({username:req.body.username});
        User.register(newUser,req.body.password,function(err,userCreated) {
            if (err) { 
                console.log(err);
             req.flash("error",err.message);
                 return res.render("register");
            }
            passport.authenticate("local")(req,res,function() {
                    req.flash("success","Welcome to Mordi's Campground "+userCreated.username);

               res.redirect("/campgrounds"); 
            });
        });
});

//my design to login page
// ********************************************************************************
//show new login form
router.get("/loginnew",function(req,res){
    res.render("loginnew");
});
router.post("/loginnew",passport.authenticate("local",
{successRedirect:"/campgrounds",
    failureRedirect:"/loginnew"
}),function(req,res) {
    var newUser = new User({username:req.body.username});
       
});




//my register design page

router.get("/registernew",function(req,res){
    res.render("registernew");
});


router.post("/registernew",function(req,res) {
    var newUser = new User({username:req.body.username});
        User.register(newUser,req.body.password,function(err,userCreated) {
            if (err) { 
                console.log(err);
                 req.flash("error",err.message);
                 return res.render("registernew");
            }
            passport.authenticate("local")(req,res,function() {
                    req.flash("success","Welcome to Mordi's Campground "+userCreated.username);

               res.redirect("/campgrounds"); 
            });
        });
});

// ********************************************************************************
//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handle with login logic
router.post("/login",passport.authenticate("local",
{successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res) {
    var newUser = new User({username:req.body.username});
       
});


//logout route
router.get("/logout",function(req,res) {
   req.logout();
   req.flash("success","Logged you out");
   res.redirect("/loginnew");
});



module.exports = router;