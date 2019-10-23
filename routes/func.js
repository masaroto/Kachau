var express = require("express");
var router = express.Router()
var Prod = require("../model/prod");


//ROUTES
router.get("/", function(req, res) {
        //for pra loopar entre os usarios do BD 
        res.render("menuFunc");
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



module.exports = router;