  var express = require("express");
  var router = express.Router();
     var Campground = require("../models/campground");

   
     var NodeGeocoder = require('node-geocoder');
    var Animal = require("../models/animal");
    var Event = require("../models/event");
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 router.post("/animals", function(req, res){
  // get data from form and add to campgrounds array
  console.log("INN");
  var name = req.body.name;
  
var newAnimal = {name: name};
    // Create a new Animal and save to DB
    Animal.create(newAnimal, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds/animals");
        }
    });

});


//create
//CREATE - add new campground to DB

//new - show form to create new campground
router.get("/testxml",function(req,res) {
    res.render("campgrounds/testxml");
});
router.get("/new",function(req,res) {
    res.render("campgrounds/new");
});
router.get("/template",function(req,res) {

    res.render("campgrounds/template");
     
});
router.get("/newindex",function(req,res) {
    res.render("campgrounds/newindex",{fileImported:0});
    
});
router.get("/animals",function(req,res) {
    res.render("campgrounds/animals");
});
router.get("/events",function(req,res) {
    res.render("campgrounds/events");
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

router.get("/",function(req,res) {
    res.render("campgrounds/landing");
});



module.exports = router;