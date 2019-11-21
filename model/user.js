var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String, 
        LastName: String, 
        Email: String,
        Password: String,
        Adress: String, 
        Adress2: String, 
        City: String, 
        State: String, 
        CEP: String 
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);