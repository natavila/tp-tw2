const { Usuario } = require('../models/usuario');
const { Carrito } = require('../models/carrito');
const { VideoJuego } = require('../models/video-juego');

const carritoPost = async (req, res) => {

    const { idUsuario, listaDeJuegos } = req.body;

    try {
        const usuario = await Usuario.findById(idUsuario);

        if(!usuario){
            res.send({ mensaje: "No existe el usuario que se trato asignar al carrito" });
            return;
        }
    
        const videojuegosEncontrado = await VideoJuego.find({ _id: listaDeJuegos });

        if(videojuegosEncontrado.length < listaDeJuegos.length){
            res.send({ mensaje: "Uno o mas juegos que se intentaron sumar al carrito no existen" });
            return;
        }

        const carrito = new Carrito({
            idUsuario, listaDeJuegos
        });

        const carritoCreado = await carrito.save();
        res.send({ id: carritoCreado.id, mensaje: 'Se creo el carrito' });
    } catch (error) {

        res.send({ mensaje: error.message });
    }  
};

module.exports = { carritoPost };
