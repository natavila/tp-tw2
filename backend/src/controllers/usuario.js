const { Usuario } = require('../models/usuario');
const { transporter } = require('../nodemailer/config');
const { config } = require('../auth/config');

var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

var BCRYPT_SALT_ROUNDS = 12;

const usuarioList = async (req, res) => {
    
    try {
        
        const usuarios = await Usuario.find();
        res.send(usuarios.map(ocultarPropiedades));
    } catch (error) {
        
        res.send({ mensaje: 'Error al listar los usuarios', error });
    }
};

const usuarioGet = async (req, res) => {

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

    const { nombre, apellido, email, contrasena, direccion, preferencias, puntos, estado, codigo } = req.body;

    const usuario = new Usuario({
        nombre, apellido, email, contrasena, direccion, preferencias, puntos, estado, codigo
    });

    const correo = await Usuario.findOne({ email });

        try {

            if(correo){
                res.send({ mensaje: 'El correo ingresado ya se encuentra registrado' });
                if (contrasena.length < 8) {
                    res.send({ mensaje: 'La contraseña debe contener al menos 8 caracteres' });
                }
                
            }else{

                    const token = jwt.sign({_id: usuario._id}, 'secretkey')

                    bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS)
                    .then(async function(hashedPassword){
                        usuario.contrasena = hashedPassword;
                        usuario.codigo = token;

                        const usuarioCreado = await usuario.save();
                        res.send({ id: usuarioCreado.id, mensaje: 'Se creo el usuario', token: token});
                    });

                    await transporter.sendMail({
                        from: '"Fred Foo 👻" <avila.nataly12@gmail.com>', // sender address
                        to: usuario.email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        html: `<h1>Email Confirmation</h1>
                        <h2>Hello ${nombre}</h2>
                        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                        <a href=http://localhost:4200/> Click here</a>
                        </div>`, // html body
                      });
                }
        
        } catch (error) {

        res.send({ mensaje: error.message });
    }  
};

const usuarioPut = async (req, res) => {

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
