var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


var User = require("./model/user");

// var seeds = require("./seeds");
var app = express();
mongoose.connect("mongodb://localhost/kachau");

app.use(require("express-session")({
    secret: "That's the secret phrase I use it to password",
    saveUninitialized: false,
    resave: false
    
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate() ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

var funcRoute = require("./routes/func");
var gerRoute = require("./routes/ger");
var propRoute = require("./routes/proprietario");
var clienteRoute = require("./routes/cliente");




app.use("/adm/func",funcRoute);
app.use("/adm/ger",gerRoute);
app.use("/adm/prop",propRoute);
app.use("/",clienteRoute);








app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});



app.listen(8000, function(){
    console.log("Server running")
});

//Mongo: cd "C:\Program Files\MongoDB\Server\4.2\bin"
