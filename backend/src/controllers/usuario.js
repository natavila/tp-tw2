const { Usuario } = require('../models/usuario');

/*
 * Controlador para listar todos los usuarios
*/
const usuarioList = async (req, res) =>{

    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios.map(ocultarPropiedades));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al listar los usuarios', error });
    }
};

/*
 * Controlador para listar un usuario por id
*/
const usuarioGet = async (req, res) =>{

    const { id } = req.params;

    if(!esObjectIdValido(id)) {
        res.status(400).send({mensaje: `El identificador ${id} es invalido`});
        return;
    }

    try {
        const usuario = await Usuario.findById(id);

        if(!usuario) 
            res.status(404).send({mensaje: 'No existe el usuario ' + id});
        else
            res.status(200).send(ocultarPropiedades(usuario));
    } catch (error) { 
        res.status(500).send({ mensaje: 'Error al buscar usuario', error });
    }
};

/*
 * Controlador para crear un nuevo usuario
*/
const usuarioPost = async (req, res) => {

    if(!poseeLasPropiedadesRequeridas(req.body)) {
        res.status(400).send({ mensaje: 'Las propiedades [ nombre - apellido - email - contrasena ] son requeridas' });
        return;
    }

    if(!esEmailValido(req.body.email)) {
        res.status(400).send({ mensaje: `El email ${req.body.email} es invalido` });
        return;
    }

    const usuario = new Usuario(req.body);

    try {
        const usuarioCreado = await usuario.save();
        res.status(200).send({ id: usuarioCreado.id, mensaje: 'Se creo el usuario' });
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Controlador para actualizar propiedades de un usuario
*/
const usuarioPut = async (req, res) =>{

    const { id } = req.params;

    if(!esObjectIdValido(id)) {
        res.status(400).send({mensaje: `El identificador ${id} es invalido`});
        return;
    }

    const { __id, ...restoDelUsuario } = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, restoDelUsuario);

        if(!usuario) 
            res.status(404).send({ mensaje: 'No existe el usuario ' + id }); 
        else
            res.status(200).send({ id, mensaje: 'Se actualizo el usuario' });
    } catch (error) { 
        res.status(500).send({ mensaje: 'No se pudo actualizar el usuario ' + id, error });
    }
};

/*
 * Controlador para eliminar un usuario
*/
const usuarioDelete = async (req, res) => {

    const { id } = req.params;

    if(!esObjectIdValido(id)) {
        res.status(400).send({mensaje: `El identificador ${id} es invalido`});
        return;
    }

    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if(!usuarioEliminado)
            res.status(404).send({ mensaje: 'No existe el usuario ' + id });
        else
            res.status(200).send({ id, mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo eliminar al usuario ' + id, error });
    }
};

/*
 * Helpers de los metodos de usuario
*/
const ocultarPropiedades = usuario => {
    const { __v, contrasena, _id, ...restoDelUsuario } = usuario._doc;
    restoDelUsuario.id = _id;

    return restoDelUsuario;
}

const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

const esEmailValido = email => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}

const poseeLasPropiedadesRequeridas = propiedades => {

    const propiedadesRequeridas = ['nombre', 'apellido', 'email', 'contrasena'];

    let existenTodasLasPropiedadesRequeridas = true;

    propiedadesRequeridas.forEach(propiedad => {

        if(!propiedades[propiedad])
            existenTodasLasPropiedadesRequeridas = false;
    });

    return existenTodasLasPropiedadesRequeridas;
}

module.exports = { usuarioList, usuarioGet, usuarioPost, usuarioPut, usuarioDelete }
