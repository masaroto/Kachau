var express = require("express");
var router = express.Router();
var passport = require("passport");
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
router.post("/func/",function(req,res){
        console.log(req.body.func)
       
        Func.find(req.body.func,function(err,userFind){
           if(err){
               console.log("Erro!!!!");
               console.log(err);
           } else {
               res.render("menuGer.ejs",{users:userFind});
           }
        });
});
    

router.post("/register/func",function(req,res){
        
        Func.register(req.body.func, req.body.password ,function(err){
                console.log(req.body.func);
                if(err){
                        console.log("Erro");
                        console.log(err);
                } else {
                        console.log("User inserido com sucesso");
                }
        });
        passport.authenticate("local")(req, res, function(){
                res.redirect("/adm/ger");
        });

});

//deletar funcionarios
router.delete("/func/delete/:id", function(req, res){
        Func.findByIdAndRemove(req.params.id,function (err) {
            if(err){
                console.log("ERRO!!!!!!!!!!!!!")
                console.log(err);
            } else {
                res.redirect("/adm/ger");
            }
        });
});

//update funcionario

router.get("/func/:id", function(req, res) {
        //for pra loopar entre os usarios do BD 
        Func.findById(req.params.id,function(err,foundUser){
            if(err){
                console.log("Erro!!!!");
                console.log(err);
            } else {
                res.render("funcEdit.ejs",{user:foundUser});
                //pegar dados dos forms e alterar no banco de dados
            }
        });
});

router.put("/func/:id", function(req, res) {
        //Atualizar dados no BD
        //User.findByIdAndUpdate(ID, Obj Att, callback)
        Func.findByIdAndUpdate(req.params.id,req.body.updateUser,function(err,foundUser){
            if(err){
                console.log("Erro!!!!");
                console.log(err);
            } else {
                console.log(req.body.user);
                res.redirect("/adm/ger");
            }
        });
});

//deletar funcionario
router.delete("/func/delete/:id", function(req, res){
        Func.findByIdAndRemove(req.params.id,function (err) {
            if(err){
                console.log("ERRO!!!!!!!!!!!!!")
                console.log(err);
            } else {
                res.redirect("/adm/ger");
            }
        });
});
    

module.exports = router;