const mongoose = require('mongoose');

var Videojuegos = mongoose.model('videojuegos', {
    nombre: {type: String},
    descripcion: {type: String},
    categoria: {type: String},
    clasificacion: {type: Number},
    precio: {type: Number},
    puntos: {type: Number} 
});

module.exports = Videojuegos;