var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var FuncSchema = new mongoose.Schema({
        username: String, 
        LastName: String, 
        Email: String,
        Password: String,
        CPF: String,
        Telefone: String
        
});

FuncSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Func",FuncSchema);