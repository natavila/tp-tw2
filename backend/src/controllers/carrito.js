const { Usuario } = require('../models/usuario');
const { Carrito } = require('../models/carrito');
const { VideoJuego } = require('../models/video-juego');

/*
 * Controlador para crear un carrito
*/
const carritoPost = async (req, res) => {

    const { idUsuario, listaDeJuegos } = req.body;

    if(!esObjectIdValido(idUsuario)) {
        res.status(400).send({mensaje: `El identificador ${idUsuario} del usuario es invalido`});
        return;
    }

    try {
        const usuario = await Usuario.findById(idUsuario);

        if(!usuario){
            res.status(404).send({ mensaje: 'No existe el usuario que se trato asignar al carrito' });
            return;
        }
    
        const videojuegosEncontrados = await VideoJuego.find({ _id: listaDeJuegos });

        if(videojuegosEncontrados.length < listaDeJuegos.length){
            res.status(404).send({ mensaje: 'Uno o mas juegos que se intentaron sumar al carrito no existen' });
            return;
        }

        const carrito = new Carrito({ idUsuario, listaDeJuegos });
        const carritoCreado = await carrito.save();

        res.status(200).send({ id: carritoCreado.id, mensaje: 'Se creo el carrito' });
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Helpers de los controladores de carrito
*/
const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = { carritoPost };
