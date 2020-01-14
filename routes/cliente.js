var express = require("express");
var router = express.Router();
var passport = require("passport");
var Prod = require("../model/prod");
var User = require("../model/user");
var Cart = require("../model/cart");
var Pedido = require("../model/pedidos");

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

router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect: "/register"
}) ,function(req,res){
    console.log(req.user);
});

router.get("/profile",isLogged,function(req, res){
    res.send("Bem vindo "+ req.user.username);
    console.log(req.user);
});

router.get("/carrinho", function(req, res) {
    // console.log(Cart.preco);
    res.render("cart", {prods:Cart}); 
    
});


router.get("/cart/:id", function(req, res, next) {
    Prod.findById(req.params.id, function(err, prodFound){
        if(err){
            return res.redirect('/');
        }
        Cart.add(prodFound);
        Cart.isEmpty = false;
        req.session.Cart = Cart;
        // console.log(Cart.items);
        res.redirect('/carrinho');
    });
    // res.render("cart", {prods:prodList}); 
});

router.get("/cart/delete/:id", function(req, res, next) {
    Cart.delete(req.params.id);
    res.redirect("/carrinho");  
});

router.get("/produto/:nome", function(req, res){
    res.render("prodPage");
});

router.get("/pedidos", function(req,res){
    Pedido.find({},function(err,pedidos){
        if(err){
            console.log("Deu ruim");
        }
        res.render("meusPedidos",{pedidos:pedidos});
    })
});

router.get("/pedidos/final", function(req, res){
    res.render("finalizarPedido", {cart:Cart});
});
router.post("/pedidos/final",function(req, res){
    var prodList = []

    for(var x in Cart.items){
        prodList.push(x);
    }

    newPedido = {prods: prodList,
        status: "Encaminhando",
        endereco: req.user.Adress,
        transporte: req.body.transporte,
        pagamento: req.body.pagamento,
        data: new Date(),
        preco: Cart.precoTotal};

    Pedido.create(newPedido,function(err){
        if(err){
            console.log("Deu ruim");
        }
    });


});

router.get("/logout", function(req, res) {
    req.session.destroy(function () {
        res.redirect('/'); //Inside a callback… bulletproof!
  });
});

function isLogged(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;