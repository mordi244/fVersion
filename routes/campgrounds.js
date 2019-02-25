  var express = require("express");
  var router = express.Router();
     var Campground = require("../models/campground");
     var Comment = require("../models/comment");
     var middleware = require("../middleware");
     var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
   
//index = show all campgrounds
router.get("/",function(req,res) {

    //get all camp from db and then render the file.
    Campground.find({},function(err,allcampgrounds) {
       if (err) console.log(err);
       else {
           res.render("campgrounds/index",{campgrounds:allcampgrounds,
               currentUser:req.user
           });
       }
    });
     
});
//create
//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});
//new - show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res) {
    res.render("campgrounds/new");
});

//show more info about camp ground
router.get("/:id",function(req,res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround) {
       if (err) console.log (err);
       else {
           console.log(foundCampGround);
           res.render("campgrounds/show",{campground:foundCampGround});
       }
    });
   
    //render show template with that campground
    
});

//edit campgrounds route

//update campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res) {

   Campground.findById(req.params.id,function(err,foundCampGround) {
         res.render("campgrounds/edit",{campground:foundCampGround});
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
        if (err) {
            console.log(err);
        }
        Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });
    })
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//delete route

router.delete("/:id",function(req,res) {
   Campground.findByIdAndRemove(req.params.id,function(err) {
      if (err)
         res.redirect("/campgrounds");
      else {
          res.redirect("/campgrounds");
      }
   });
});





module.exports = router;