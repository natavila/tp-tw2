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
        res.status(200).send(usuarios.map(ocultarPropiedades));
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    });
};

/*
 * Controlador para listar un usuario por su id
*/
const usuarioGet = (req, res) => {
    const { id } = req.params;

    if(!esObjectIdValido(id))
        return res.status(400).send({ mensaje: `El identificador ${id} es invalido` });

    Usuario.findById(id)
    .then(usuario => {
        if(!usuario)
            return res.status(404).send({ mensaje: `No existe el usuario ${id}` });

        res.status(200).send(ocultarPropiedades(usuario));
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
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

    if(!esContrasenaValida(req.body.contrasena))
        return res.status(400).send({ mensaje: 'La contraseña debe contener mínimo ocho caracteres, al menos una letra y un número' });

    Usuario.findOne({ email: req.body.email })
    .then(usuarioExistente => {
        if(usuarioExistente && usuarioExistente.estado === 'Activo')
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
                res.status(200).send({ mensaje: 'Usuario creado', id: usuarioCreado._id });
                const token = JWT.sign({ _id: usuarioCreado._id }, 'secretkey', { expiresIn: '168h' })
                return transporter.sendMail(estructuraDelEmail(usuarioCreado, token));
            })
            .catch(error => {
                res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
            })
        }
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

/*
 * Controlador para loguear un usuario
*/
const usuarioLogin = (req, res) => {
    const { email, contrasena } = req.body;

    if(!email || !contrasena){
        return res.status(400).send({ mensaje: 'El email y la contrasena son requeridos para loguearse' })
    }
    Usuario.findOne({ email })
    .then(usuario => {
        if(!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena))
            return res.status(400).send({ mensaje: 'Email o contrasena incorrecta' });

        if(usuario.estado !== 'Activo')
            return res.status(400).send({ mensaje: 'Debe verificar la cuenta para poder loguearse' });

        res.status(200).send({ token: JWT.sign({ _id: usuario._id }, 'secretkey', { expiresIn: '24h' }) });
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

const verificarUsuario = (req, res) => {
    const { token } = req.params;

    if(!token)
        return res.status(400).send({ mensaje: 'Para verificar la cuenta debe de enviarse el token' });

    let payload;

    try {
        payload = JWT.verify(token, 'secretkey');
    } catch (error) {
        return res.status(400).send({ mensaje: 'Token invalido' })
    }

    Usuario.findById(payload._id)
    .then(usuario => {
        if(!usuario)
            return res.status(400).send({ mensaje: 'Token invalido' });

        res.status(200).send({ mensaje: 'Verificacion realizada con exito' });
        usuario.estado = 'Activo';
        return usuario.save();
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
}

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

const esContrasenaValida = contrasena => {
    return contrasena.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
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

const estructuraDelEmail = (data, token) => {
    return {
        from: '"VideoJuegos Store" <avila.nataly12@gmail.com>',
        to: data.email,
        subject: "Codigo de verificacion✔ - VideoJuegos Store",
        html: `<h1>Confirmacion de correo electronico</h1>
        <h2>Hola ${data.nombre}</h2>
        <p>Para validar tu cuenta, ingresa en el siguiente enlace <a href="http://localhost:4200/verificacion/${token}" target="_blank">confirmar cuenta</a></p>
        <p>El codigo tiene una validez de siete (7) dias, en caso de no confirmar antes del tiempo estipulado debe completar el formulario de registro nuevamente.</p>`
    }
}

module.exports = { usuarioList, usuarioGet, usuarioPost, verificarUsuario, usuarioLogin }
