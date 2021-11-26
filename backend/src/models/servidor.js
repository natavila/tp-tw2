const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../database/config');
const usuarioRutas = require('../routes/usuario');
const videoJuegoRutas = require('../routes/video-juego');
const carritoRutas = require('../routes/carrito');
const pedidoRutas = require('../routes/pedido');

class Servidor {

    constructor() {
        this.app = express();
        this.puerto = 3000;
        this.conectarDB();
        this.middlewares();
        this.rutas();
    }

    conectarDB() {
        return dbConexion();
    }

    middlewares() {
        this.app.use(cors({ origin: true }));
        this.app.use(express.json());
    }

    rutas() {
        this.app.use('/usuario', usuarioRutas);
        this.app.use('/video-juego', videoJuegoRutas);
        this.app.use('/carrito', carritoRutas);
        this.app.use('/pedido', pedidoRutas);
    }

    listen() {
        this.app.listen(this.puerto, () => console.log('Servidor online en el puerto: ' + this.puerto));
    }
}

module.exports = Servidor;
