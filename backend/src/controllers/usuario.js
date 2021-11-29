const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');
const { transporter } = require('../nodemailer/config');

/*
 * Controlador para listar todos los usuarios
*/
const usuarioList = (req, res) =>{
    Usuario.find()
    .then(usuarios => {
        return res.status(200).send(usuarios.map(ocultarPropiedades));
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error al listar los usuarios', error });
    });
};

/*
 * Controlador para listar un usuario por su id
*/
const usuarioGet = (req, res) => {
    const { id } = req.params;

    if(!esObjectIdValido(id))
        return res.status(400).send({mensaje: `El identificador ${id} es invalido`});

    Usuario.findById(id)
    .then(usuario => {
        if(!usuario)
            return res.status(404).send({mensaje: 'No existe el usuario ' + id});

        return res.status(200).send(ocultarPropiedades(usuario));
    })
    .catch(error => {
        return res.status(500).send({ mensaje: 'Error al buscar usuario', error });
    })
};

/*
 * Controlador para registrar un nuevo usuario
*/
const usuarioPost = (req, res) => {
    if(!poseeLasPropiedadesRequeridas(req.body))
        return res.status(400).send({ mensaje: 'Las propiedades [ nombre - apellido - email - contrasena ] son requeridas' });

    if(!esEmailValido(req.body.email))
        return res.status(400).send({ mensaje: `El email ${req.body.email} es invalido` });

    Usuario.findOne({ email: req.body.email })
    .then(usuarioExistente => {
        if(usuarioExistente)
            res.status(400).send({ mensaje: `El email ${req.body.email} se encuentra registrado` });
        else{
            let usuario = new Usuario(req.body);
            bcrypt.hash(usuario.contrasena, 12)
            .then(contrasenaEncriptada => {
                usuario.contrasena = contrasenaEncriptada;
                usuario.codigo = Math.round(Math.random()*999999);
                return usuario.save();
            })
            .then(usuarioCreado => {
                res.status(200).send({  mensaje: 'Usuario creado', id: usuarioCreado._id, token: JWT.sign({ _id: usuarioCreado._id }, 'secretkey') });
                return transporter.sendMail(estructuraDelEmail(usuarioCreado));
            })
            .catch(error => {
                res.status(500).send({ mensaje: error.message });
            })
        }
    })
    .catch(error => {
        res.status(500).send({ mensaje: error.message });
    })
};

/*
 * Controlador para loguear un usuario
*/
const usuarioLogin = (req, res) => {
    const { email, contrasena } = req.body;

    if(!email || !contrasena)
        return res.status(400).send({ mensaje: 'El email y la contrasena son requeridos para loguearse' })

    Usuario.findOne({ email })
    .then(usuario => {
        if(!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena))
            return res.status(400).send({ mensaje: 'Email o contrasena incorrecta' });

        res.status(200).send({ token: JWT.sign({ _id: usuario._id }, 'secretkey') });
    })
    .catch(error => {
        res.status(500).send({ mensaje: error.message });
    })
};

/*
 * Helpers
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

const estructuraDelEmail = (data) => {
    return {
        from: '"VideoJuegos Store" <avila.nataly12@gmail.com>',
        to: data.email,
        subject: "Codigo de verificacion✔ - VideoJuegos Store",
        html: `<h1>Confirmacion de correo electronico</h1>
        <h2>Hola ${data.nombre}</h2>
        <p>Para validar tu cuenta, ingresa el siguiente codigo en la aplicacion: <strong>${data.codigo}</strong></p>`
    }
}

module.exports = { usuarioList, usuarioGet, usuarioPost, usuarioLogin }
