const express = require('express');
var { Usuario } = require('../models/usuario');
var { Carrito } = require('../models/carrito');
var { Videojuego } = require('../models/videojuego');
var router = express.Router();

router.post('/', async (req, res) => {

    var { idUsuario, listaDeJuegos } = req.body;

    try {
        var usuario = await Usuario.findById(idUsuario);

        if(!usuario){
            res.send({ mensaje: "No existe el usuario que se trato asignar al carrito" });
            return;
        }
    
        var videojuegosEncontrado = await Videojuego.find({ _id: listaDeJuegos });

        if(videojuegosEncontrado.length < listaDeJuegos.length){
            res.send({ mensaje: "Uno o mas juegos que se intentaron sumar al carrito no existen" });
            return;
        }
     
        var carrito = new Carrito({
            idUsuario, listaDeJuegos
        });

        var carritoCreado = await carrito.save();
        res.send({ id: carritoCreado.id, mensaje: 'Se creo el carrito' });
    } catch (error) {

        res.send({ mensaje: error.message });
    }  
});

module.exports = router;