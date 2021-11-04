const express = require('express');
var { Videojuego } = require('../models/videojuego');
var router = express.Router();

router.get("/", async (req,res) => {

    try {

        var videojuego = await Videojuego.find();
        res.send(videojuego);
    } catch (error) {
        
        res.send({ mensaje: "Error al listar videojuegos", error });
    }
});

router.get("/:id", async (req,res) => {

    var { id } = req.params;

    try {

        var videojuegoEncontrado = await Videojuego.findById(id);
        if(!videojuegoEncontrado)
            res.send({ mensaje: "No existe el videojuego " + id });
        else
            res.send(videojuegoEncontrado);
    } catch (error) {
        
        res.send({ mensaje: "Error al buscar videojuego", error });
    }
    
});

router.get("/buscar-por-categoria/:categoria", async (req, res) => {

        var { categoria } = req.params;

        try {
            
            var videojuegos = await Videojuego.find({ categoria: categoria });
            if(videojuegos.length == 0){
                res.send({ mensaje: "No hay juegos con la categoria " + categoria });
                
            }
            else
                res.send(videojuegos);
                
        } catch (error) {
            res.send({ mensaje: "Error al buscar juegos por categoria ", error });
        }
});

module.exports = router;
