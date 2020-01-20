var express = require("express");
var router = express.Router();
var Prod = require("../model/prod");
var User = require("../model/user");

//middleware
function isLogged(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//ROUTES
router.get("/", function(req, res) {
   User.find({},function(err,allFunc){
        if(err){
            console.log("Erro!!!!");
            console.log(err);
        } else {
            res.render("menuFunc.ejs",{users:allFunc});
            //users._id id do usuario
        }
    }).sort({Name:1}); //ordem alfabética
});

// prod Create
router.get("/register/prod", function(req, res) {
        res.render("prodRegister");
});
    
router.post("/register/prod", function(req, res) {
        Prod.create(req.body.produto, function(err, produto){
                if(err){
                console.log("ERRO!!!!!!!!!!");
                }else{
                console.log("Produto " + produto.name + " inserido com sucesso");
                res.redirect("/adm/func");
                }
        });
});

//prod Read
router.get("/prod", function(req, res) {
        Prod.find({}, function(err, allProd) {
            if(err){
                console.log(err);
            } else {
                res.render("prod", {prods:allProd});
            }
        });
        
});

//prod Update
router.get("/prod/edit/:id", function(req, res) {
        Prod.findById(req.params.id,function(err,foundProd){
           if(err){
               console.log(err);
           } else {
               res.render("prodEdit.ejs",{prod:foundProd});
               //pegar dados dos forms e alterar no banco de dados
           }
       });
        
});

router.put("/prod/edit/:id", function(req, res) {
        Prod.findByIdAndUpdate(req.params.id,req.body.produto,function(err,foundUser){
           if(err){
               console.log("Erro!!!!");
               console.log(err);
           } else {
               console.log(req.body.user);
               res.redirect("/adm/func/prod");
           }
       });
});


//prod Delete
router.delete("/prod/delete/:id", function(req, res) {
        Prod.findByIdAndRemove(req.params.id,function (err) {
            if(err){
                console.log(err);
            } else {
                res.redirect("/adm/func/prod");
            }
        });
});

//Busca Clientes
router.post("/users/",function(req,res){     
    
    User.find(req.body.user,function(err,userFind){
      if(err){
          console.log("Erro!!!!");
          console.log(err);
      } else {
          console.log(userFind);
          res.render("menuFunc.ejs",{users:userFind});
      }
   });
});

//deleta Clientes
router.delete("/delete/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            console.log("ERRO!!!!!!!!!!!!!")
            console.log(err);
        } else {
            res.redirect("/adm/func");
        }
    });
});
module.exports = router;