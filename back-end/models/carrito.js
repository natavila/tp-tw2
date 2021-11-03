const mongoose = require('mongoose');

var Carrito = mongoose.model('carritos', {
    idUsuario: {type: String, required: [true, "El id del usuario es obligatorio"]},
    listaDeJuegos: {type: [], default: []}
});

module.exports = {Carrito:Carrito};