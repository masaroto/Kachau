var express = require("express");
var router = express.Router();
var passport = require("passport");
var Prod = require("../model/prod");
var User = require("../model/user");

//mostra produtos
router.get("/",function(req, res) {
    Prod.find({}, function(err, allProd) {
        if(err){
            console.log(err);
        } else{
            res.render("home", {prods:allProd}); 
        }
    });
   
});

//Create Cliente
router.get("/register",function(req,res){
    res.render("register.ejs");
}); 

router.post("/register", function(req,res){

    User.register(new User({username: req.body.username,
        LastName: req.body.UserLastName,
        Email: req.body.UserEmail,
        Adress: req.body.UserAddress, 
        Adress2: req.body.UserAddress2, 
        City: req.body.UserCity, 
        State:req.body.UserState, 
        CEP: req.body.UserCEP}),req.body.password, function(err,user){
        if(err){
            console.log(err);
        }
       passport.authenticate("local")(req, res, function(){
           console.log("Cadastrado com sucesso")
           res.redirect("/login");
       }); 
    });
});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect: "/login"
}) ,function(req,res){
    console.log(req.user);
});

router.get("/profile",function(req, res){
    res.send("Bem vindo "+ req.user.username);
    console.log(req.user);
});


function isLogged(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;