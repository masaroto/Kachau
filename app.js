var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");


//models
var Prod = require("./model/prod");
var Ger = require("./model/ger");



// var seeds = require("./seeds");


mongoose.connect("mongodb://localhost/kachau");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

var funcRoute = require("./routes/func");
var gerRoute = require("./routes/ger");
var propRoute = require("./routes/proprietario")

app.use("/adm/func",funcRoute);
app.use("/adm/ger",gerRoute);
app.use("/adm/prop",propRoute);


//Passport configuration
app.use(require("express-session")({
    secret: "This just some secret string",
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Ger config
passport.use(new LocalStrategy(Ger.authenticate()));
passport.serializeUser(Ger.serializeUser());
passport.deserializeUser(Ger.deserializeUser());





app.listen(8000, function(){
    console.log("Server running")
});

//Mongo: cd "C:\Program Files\MongoDB\Server\4.2\bin"
