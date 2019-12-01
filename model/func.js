var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var funcSchema = new mongoose.Schema({
        username: String, 
        LastName: String, 
        Email: String,
        Password: String,
        CPF: String,
        Telefone: String
        
});

funcSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("func",funcSchema);