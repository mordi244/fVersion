var mongoose = require("mongoose");
 
var animalSchema = new mongoose.Schema({
   name: String

});
 
module.exports = mongoose.model("Animal", animalSchema);