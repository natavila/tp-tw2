const mongoose = require('mongoose');

var Usuario = mongoose.model('usuario', {
    nombre: {type: String},
    apellido: {type: String},
    email: {type: String},
    contraseña: {type: String},
    direccion: {type: String},
    edad: {type: Number},
    preferencias: {type: Array},
    puntos: {type: Number} 
});

module.exports = {Usuario:Usuario};