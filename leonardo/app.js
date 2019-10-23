var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Prod = require("./model/prod");
// var seeds = require("./seeds");


mongoose.connect("mongodb://localhost/kachau");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

var funcRoute = require("./routes/func.js");
app.use(funcRoute);



app.listen(8000, function(){
    console.log("Server running")
});