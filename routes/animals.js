  var express = require("express");
  var router = express.Router();
   

    var Animal = require("../models/animal");


router.get("/",function(req,res) {

    //get all camp from db and then render the file.
    Animal.find({},function(err,allanimals) {
       if (err) console.log(err);
       else {
           res.render("campgrounds/animals",{animals:allanimals
           });
       }
    });
     
});








//comments create
router.post("/", function(req, res){
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





//comments delete route
router.delete("/:id",function(req,res) {
   Animal.findByIdAndRemove(req.params.name,function(err) {
      if (err)
         res.redirect("/campgrounds/animals");
      else {
          res.redirect("/campgrounds/animals");
      }
   });
});




module.exports = router;