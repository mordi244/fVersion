var mongoose = require("mongoose");
 
var eventSchema = new mongoose.Schema({
   name: String

});
 
module.exports = mongoose.model("Event", eventSchema);