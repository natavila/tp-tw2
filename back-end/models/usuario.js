const mongoose = require('mongoose');

var Usuario = mongoose.model('usuarios', {
    nombre: {type: String, required: [true, "El nombre del usuario es obligatorio"]},
    apellido: {type: String},
    email: {type: String, required: [true, "El email del usuario es obligatorio"]},
    contraseña: {type: String, required: [true, "La contraseña del usuario es obligatorio"]},
    direccion: {type: String},
    nacimiento: {type: Date},
    preferencias: {type: String},
    puntos: {type: Number, default: 0} 
});

module.exports = {Usuario:Usuario};