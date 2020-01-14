var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String, 
        LastName: String, 
        Email: String,
        Password: String,
        Adress: String, 
        CPF: Number, 
        City: String, 
        State: String, 
        CEP: String,
        Pedido: [ {type: mongoose.Schema.Types.ObjectId, ref: "pedido"} ]
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);