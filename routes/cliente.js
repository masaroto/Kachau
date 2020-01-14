var express = require("express");
var router = express.Router();
var passport = require("passport");
var Prod = require("../model/prod");
var User = require("../model/user");
var Cart = require("../model/cart");
var Pedido = require("../model/pedidos");

//mostra produtos / pagina principal
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
        CPF: req.body.UserCPF, 
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


//route do login
router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect: "/register"
}) ,function(req,res){
    console.log(req.user);
});

// router.get("/profile",isLogged,function(req, res){
//     res.send("Bem vindo "+ req.user.username);
//     console.log(req.user);
// });


//Routo do carrinho
router.get("/carrinho", function(req, res) {
    // console.log(Cart.preco);
    res.render("cart", {prods:Cart}); 
    
});

//Botao de add no carrinho
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

//botao de deletar do carrinho
router.get("/cart/delete/:id", function(req, res, next) {
    Cart.delete(req.params.id);
    res.redirect("/carrinho");  
});

//pagina do produto
router.get("/produto/:nome", function(req, res){
    res.render("prodPage");
});

//ROUTE DE PEDIDOS 
//Mostra todos os pedidos do cliente
router.get("/pedidos", isLogged ,function(req,res){
    Pedido.find({},function(err,pedidos){
        if(err){
            console.log("Deu ruim");
        }
        res.render("meusPedidos",{pedidos:pedidos});
    })
});

//Route de finalizar pedidos
router.get("/pedidos/final", isLogged,function(req, res){
    res.render("finalizarPedido", {cart:Cart});
});

router.post("/pedidos/final",isLogged,function(req, res){
    var prodList = []
    
    for(var x in Cart.items){
        prodList.push(x);
    }
    if(prodList.length){
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
            Cart.items = {};
            Cart.isEmpty = true;
            Cart.precoTotal = 0;

        });
    } else {
        console.log("Sem produtos no carrinho");
    }

});

//fazer logout
router.get("/logout", function(req, res) {
    req.session.destroy(function () {
        res.redirect('/'); //Inside a callback… bulletproof!
  });
});

//middleware para verificar se o usuario esta logado
function isLogged(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;