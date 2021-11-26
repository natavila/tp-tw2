const mongoose = require('mongoose');

const VideoJuego = mongoose.model('videojuego', {
    nombre: {
        type: String,
        required: [true, "El nombre del videojuego es obligatorio."]
    },
    descripcion: {
        type: String
    },
    categoria: {
        type: String,
        required: [true, "La categoria del videojuego es obligatoria."]
    },
    clasificacion: {
        type: Number,
        required: [true, "La clasificacion del videojuego es obligatoria."]
    },
    precio: {
        type: Number,
        required: [true, "El precio del videojuego es obligatorio."]
    },
    puntos: {
        type: Number,
        default: 100
    } 
});

module.exports = { VideoJuego };
