
var mongoose = require("mongoose");

var pedidoSchema = new mongoose.Schema({
    prods: [{type: mongoose.Schema.Types.ObjectId, ref: "prod"}],
    status: String,
    endereco: String,
    transporte: String,
    pagamento: String,
    data: { type: Date },
    // cliente: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    preco: Number
});
    

module.exports = mongoose.model("pedido",pedidoSchema);