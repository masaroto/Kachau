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
//Relatorios
router.get("/relvendas", function(req,res){
    res.render("relVendas");
});

router.get("/relusuarios", function(req,res){
    res.render("relUsuarios");
});
router.get("/relestoque", function(req,res){
    Prod.find({},function(err,allProd){
        if(err){
            console.log("Erro!!!!");
            console.log(err);
        } else {
            res.render("relEstoque",{prods:allProd});
        }
    }).sort({qtd:1});
});
//registro de funcionario
router.get("/register/func",function(req,res){
        res.render("funcRegister.ejs");  
});
router.post("/func/",function(req,res){     
         Func.find(req.body.func,function(err,userFind){
           if(err){
               console.log("Erro!!!!");
               console.log(err);
           } else {
               res.render("menuGer.ejs",{users:userFind});
           }
        });
});
    
router.post("/register/func", function(req,res){

    Func.register(new Func(req.body.func),req.body.password, function(err,user){
        if(err){
            console.log(err);
        }
       passport.authenticate("local")(req, res, function(){
           console.log("Cadastrado com sucesso")
           res.redirect("/login");
       }); 
    });
});
// router.post("/register/func",function(req,res){
//     console.log(req.body.func);
//     Func.register(new Func(req.body.func),req.body.password, function(err,user){
//         if(err){
//             console.log(err);
//         }
//        passport.authenticate("local")(req, res, function(){
//            console.log("Cadastrado com sucesso")
//            res.redirect("/login");
//        }); 
//     });  
// });

//deletar funcionarios
router.delete("/func/delete/:id", function(req, res){
        Func.findByIdAndRemove(req.params.id, function (err) {
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

module.exports = router;