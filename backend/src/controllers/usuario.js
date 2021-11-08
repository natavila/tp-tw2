const { Usuario } = require('../models/usuario');

const usuarioList = async (req, res) =>{
    
    try {
        
        const usuarios = await Usuario.find();
        res.send(usuarios.map(ocultarPropiedades));
    } catch (error) {
        
        res.send({ mensaje: 'Error al listar los usuarios', error });
    }
};

const usuarioGet = async (req, res) =>{

    const { id } = req.params;

    try {

        const usuario = await Usuario.findById(id);

        if(!usuario) 
            res.send({mensaje: 'No existe el usuario ' + id}) 
        else
            res.send(ocultarPropiedades(usuario));
    } catch (error) { 

        res.send({ mensaje: 'Error al buscar usuario', error });
    }
};

const usuarioPost = async (req, res) => {

    const { nombre, apellido, email, contrasena, direccion, preferencias, puntos } = req.body;

    const usuario = new Usuario({
        nombre, apellido, email, contrasena, direccion, preferencias, puntos
    });

    try {

        const usuarioCreado = await usuario.save();
        res.send({ id: usuarioCreado.id, mensaje: 'Se creo el usuario' });
    } catch (error) {

        res.send({ mensaje: error.message });
    }  
};

const usuarioPut = async (req, res) =>{

    const { id } = req.params;
    const { __id, ...restoDelUsuario } = req.body;

    try {

        const usuario = await Usuario.findByIdAndUpdate(id, restoDelUsuario);

        if(!usuario) 
            res.send({ mensaje: 'No existe el usuario ' + id }); 
        else
            res.send({ id, mensaje: 'Se actualizo el usuario' });
    } catch (error) { 

        res.send({ mensaje: 'No se pudo actualizar el usuario ' + id, error });
    }
};

const usuarioDelete = async (req, res) => {

    const { id } = req.params;

    try {
        
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if(!usuarioEliminado)
            res.send({ mensaje: 'No existe el usuario ' + id });
        else
            res.send({ id, mensaje: 'Usuario eliminado' });
    } catch (error) {

        res.send({ mensaje: 'No se pudo eliminar al usuario ' + id, error });
    }
};

const ocultarPropiedades = (usuario) => {
    const { __v, contrasena, _id, ...restoDelUsuario } = usuario._doc;
    restoDelUsuario.id = _id;
    return restoDelUsuario;
}

module.exports = { usuarioList, usuarioGet, usuarioPost, usuarioPut, usuarioDelete }
