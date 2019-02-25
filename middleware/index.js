//all the middleware
 var Campground = require("../models/campground");
  var Comment = require("../models/comment");
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req,res,next) {
   if (req.isAuthenticated()) {
        
           Campground.findById(req.params.id,function(err,foundCampGround) {
                if (err) {
                    console.log(err);
                        req.flash("error","Campground not found.");

                    res.redirect("back");
                }
                else {
                    if (foundCampGround.author.id.equals(req.user._id)) {
                         next();
                    }
                    else {
                    req.flash("error","Permission denied.");

                        res.redirect("back");
                    }
                    
                }
            });
    }else {
    req.flash("error","You need to be logged in.");
        res.redirect("back");
    } 
};
middlewareObj.checkCommentOwner = function(req,res,next) {
   if (req.isAuthenticated()) {
        
           Comment.findById(req.params.comment_id,function(err,foundComment) {
                if (err) {
                    console.log(err);
                 req.flash("error","Comment does'nt founds.");

                    res.redirect("back");
                }
                else {
                    if (foundComment.author.id.equals(req.user._id)) {
                         next();
                    }
                    else {
                            req.flash("error","Permission denied");

                        res.redirect("back");
                    }
                    
                }
            });
    }else {
    req.flash("error","You need to be logged in.");
        res.redirect("back");
    } 
};

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to be logged in.");
    res.redirect("/login");
};
module.exports = middlewareObj;