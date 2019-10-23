var express = require("express");
var router = express.Router();
var Ger = require("../model/pedidos");


router.post("/finalizar" ,function(req, res) {
    Pedido.create(req.user._id, function(err, user) {
        if(err){
            console.log(err);
        } else{
           
            res.send("finalizado");
        }
    });
    
    
});
    

module.exports = router;