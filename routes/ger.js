var express = require("express");
var router = express.Router()
var Prod = require("../model/prod");
var Func = require("../model/func");


router.get("/", function(req, res) {
        //Encontra os funcionarios no BD 
        Func.find({},function(err,allFunc){
            if(err){
                console.log("Erro!!!!");
                console.log(err);
            } else {
                res.render("menuGer.ejs",{users:allFunc});
                //users._id id do usuario
            }
        }).sort({Name:1}); //ordem alfabética
});

//registro de funcionario
router.get("/register/func",function(req,res){
        res.render("funcRegister.ejs");  
});
    

router.post("/register/func",function(req,res){
        console.log(req.body);
        Func.create(req.body.func,function(err){
                if(err){
                        console.log("Erro");
                        console.log(err);
                } else {
                        console.log("User inserido com sucesso");
                }
        });

        res.redirect("/");

});



    

module.exports = router;