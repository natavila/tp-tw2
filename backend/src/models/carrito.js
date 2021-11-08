const mongoose = require('mongoose');

const Carrito = mongoose.model('carrito', {
    idUsuario: {
        type: String,
        required: [true, "El id del usuario es obligatorio"]
    },
    listaDeJuegos: {
        type: [],
        default: []
    }
});

module.exports = { Carrito };
