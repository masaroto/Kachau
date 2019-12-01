var express = require("express");
var passport = require("passport");
var router = express.Router();
var Ger = require("../model/ger");


router.get("/", function(req, res) {
        //Encontra os funcionarios no BD 
        Ger.find({},function(err,allFunc){
            if(err){
                console.log("Erro!!!!");
                console.log(err);
            } else {
                res.render("menuProp.ejs",{users:allFunc});
                //users._id id do usuario
            }
        }).sort({Name:1}); //ordem alfabética
});

//registro de funcionario
router.get("/register",function(req,res){
        res.render("gerRegister.ejs");  
});
    

router.post("/register",function(req,res){
        console.log(req.body);
        Ger.create(req.body.func,function(err){
                if(err){
                        console.log("Erro");
                        console.log(err);
                } else {
                        console.log("User inserido com sucesso");
                }
        });

        res.redirect("/adm/prop/");

});


    

module.exports = router;
