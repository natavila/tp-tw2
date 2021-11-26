const mongoose = require('mongoose');

const Pedido = mongoose.model('pedido', {
    idUsuario: {
        type: String,
        required: [true, "El id del usuario es obligatorio"]
    },
    listaDeJuegos: {
        type: [],
        default: []
    }
});

module.exports = { Pedido };
