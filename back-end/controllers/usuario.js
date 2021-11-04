const express = require('express');
var { Usuario } = require('../models/usuario');
var router = express.Router();

router.get('/', async (req, res) =>{
    
    try {
        
        var usuario = await Usuario.find();
        res.send(usuario);
    } catch (error) {
        
        res.send({ mensaje: 'Error al listar los usuario', error });
    }
});

router.get('/:id', async (req, res) =>{

    var { id } = req.params;

    try {

        var usuario = await Usuario.findById(id);  
        if(!usuario) 
            res.send({mensaje: 'No existe el usuario ' + id}) 
        else    
            res.send(usuario);
    } catch (error) { 

        res.send({ mensaje: 'Error al buscar usuario', error });
    }
});

router.post('/', async (req, res) => {

    var { nombre, apellido, email, contraseña, direccion, fecha_nacimiento, preferencias, puntos } = req.body;

    var usuario = new Usuario({
        nombre, apellido, email, contraseña, direccion, fecha_nacimiento, preferencias, puntos
    });

    try {

        var usuarioCreado = await usuario.save();
        res.send({ id: usuarioCreado.id, mensaje: 'Se creo el usuario' });
    } catch (error) {

        res.send({ mensaje: error.message });
    }  
});

router.put('/:id', async (req, res) =>{

    var { id } = req.params;
    var { __id, ...restoDelUsuario } = req.body;

    try {

        var usuario = await Usuario.findByIdAndUpdate(id, restoDelUsuario);

        if(!usuario) 
            res.send({ mensaje: 'No existe el usuario ' + id }); 
        else
            res.send({ id, mensaje: 'Se actualizo el usuario' });
    } catch (error) { 

        res.send({ mensaje: 'No se pudo actualizar el usuario ' + id, error });
    }
});


router.delete('/:id', async (req, res) => {

    var { id } = req.params;

    try {
        
        var usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if(!usuarioEliminado)
            res.send({ mensaje: 'No existe el usuario ' + id });
        else
            res.send({ id, mensaje: 'Usuario eliminado' });
    } catch (error) {

        res.send({ mensaje: 'No se pudo eliminar al usuario ' + id, error });
    }
});

module.exports = router;