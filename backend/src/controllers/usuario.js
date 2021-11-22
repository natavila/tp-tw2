const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');
const { transporter } = require('../nodemailer/config');
    
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

    const { nombre, apellido, email, contrasena, direccion, preferencias, puntos, estado, codigo } = req.body;

    const usuario = new Usuario({
        nombre, apellido, email, contrasena, direccion, preferencias, puntos, estado, codigo
    });

    try {

        const correo = await Usuario.findOne({ email });

        if(correo){
            res.send({ mensaje: 'El correo ingresado ya se encuentra registrado' });
            return;        
        }

        const codigo =  Math.round(Math.random()*999999);
        var BCRYPT_SALT_ROUNDS = 12;

        bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS)
        .then(async function(hashedPassword){
            usuario.contrasena = hashedPassword;
        });

        usuario.codigo = codigo;
        const usuarioCreado = await usuario.save();
        res.send({ id: usuarioCreado.id, mensaje: 'Se creo el usuario' });

        await transporter.sendMail({
            from: '"Fred Foo 👻" <avila.nataly12@gmail.com>', // sender address
            to: usuario.email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${nombre}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link. Codigo ${codigo}</p>`, // html body
        });
    } catch (error) {
        res.send({ mensaje: error.message });
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
 * Helpers de los controladores de usuario
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
