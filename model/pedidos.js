
var mongoose = require("mongoose");

var pedidoSchema = new mongoose.Schema({
    prods: [ {type: mongoose.Schema.Types.ObjectId, ref: "prod"} ],
    preco: Number
});
    

module.exports = mongoose.model("pedido",prodSchema);