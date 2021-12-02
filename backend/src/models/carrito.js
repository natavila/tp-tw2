const mongoose = require('mongoose');

const Carrito = mongoose.model('carrito', {
    idUsuario: {
        type: String,
        required: [true, "El id del usuario es obligatorio"]
    },
    listaDeJuegos: {
        type: [],
        default: []
    },
    imagen: {
        type: String
    }
});

module.exports = { Carrito };
