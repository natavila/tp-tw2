const mongoose = require('mongoose');

var Usuarios = mongoose.model('usuarios', {
    nombre: {type: String},
    apellido: {type: String},
    email: {type: String},
    contraseña: {type: String},
    direccion: {type: String},
    edad: {type: Number},
    preferencias: {type: Array},
    puntos: {type: Number} 
});

module.exports = {Usuarios:Usuarios};