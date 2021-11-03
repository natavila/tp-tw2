const mongoose = require('mongoose');

var Videojuego = mongoose.model('videojuegos', {
    nombre: {type: String, required: [true, "El nombre del videojuego es obligatorio"]},
    descripcion: {type: String},
    categoria: {type: String, required: [true, "La categoria del videojuego es obligatorio"]},
    clasificacion: {type: Number, required: [true, "La clasificacion del videojuego es obligatorio"]},
    precio: {type: Number, required: [true, "El precio del videojuego es obligatorio"]},
    puntos: {type: Number} 
});

module.exports = {Videojuego:Videojuego};