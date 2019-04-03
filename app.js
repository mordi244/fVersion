require("dotenv").config();
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var Campground = require("./models/campground");

var methodOverride = require("method-override");
var Animal = require("./models/animal");
var Event = require("./models/event");


//// json test 


app.locals.jsondata = require("./data.json");


////


//var Comment = require("./models/comment");


//requering routes

var campgroundRoutes = require("./routes/campgrounds");



mongoose.connect("mongodb://localhost/geovet");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//seedDB();//seed the db

//passport configuration

app.use(require("express-session")({
    secret: "Once again rusty wins",
    resave:false,
    saveUninitialized:false
}));




app.use(function(req,res,next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");

   next();
});




app.use("/campgrounds",campgroundRoutes);








app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Yelp server is up");
});