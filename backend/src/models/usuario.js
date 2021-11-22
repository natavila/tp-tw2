const mongoose = require('mongoose');

const Usuario = mongoose.model('usuario', {
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido del usuario es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email del usuario es obligatorio"]
    },
    contrasena: {
        type: String,
        required: [true, "La contrasena del usuario es obligatoria"]
    },
    direccion: {
        type: String
    },
    preferencias: {
        type: Array
    },
    puntos: {
        type: Number
    },
    estado: {
        type: String,
        Enumerator: ['Pendiente', 'Activo'],
        default: 'Pendiente'
    },
    codigo: { 
        type: String, 
        unique: true 
    }
});

module.exports = { Usuario };
