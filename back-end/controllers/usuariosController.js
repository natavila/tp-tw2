const express = require('express');
var router = express.Router();

var {Usuarios} = require('../models/usuarios');

// Lleva a la ruta localhost:3000/usuarios/list
router.get('/', (req, res) =>{
    Usuarios.find((err, docs) =>{
        if(!err) {res.send(docs);}
        else {console.log('Error al recuperar usuarios: ' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req, res) => {
    var usuario = new Usuarios({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contraseña: req.body.contraseña,
        direccion: req.body.direccion,
        edad: req.body.edad,
        preferencias: req.body.preferencias,
        puntos: req.body.puntos
    });
    usuario.save((err, doc) => {
        if(!err) {res.send(doc);}
        else{console.log('Error al guardar usuario: ' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;