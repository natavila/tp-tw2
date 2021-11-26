const { Usuario } = require('../models/usuario');
const { Pedido } = require('../models/pedido');
const { VideoJuego } = require('../models/video-juego');

/*
 * Controlador para listar un pedido por id del usuario
*/
const pedidoGet = async (req, res) => {

    const { userId } = req;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    try {
        const pedido = await Pedido.findOne({ idUsuario: userId });

        if(!pedido)
            return res.status(404).send({ mensaje: 'No existe un pedido asociado al usuario ', userId });

        res.status(200).send(pedido);
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Controlador para crear un pedido
*/
//  --------------->     NO SE VA A UTILIZAR ESTE CONTROLADOR    <---------------    //
const pedidoPost = async (req, res) => {

    const { userId } = req;
    const { listaDeJuegos } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    try {
        const usuario = await Usuario.findById(userId);

        if(!usuario)
            return res.status(404).send({ mensaje: 'No existe el usuario que se trato asignar al carrito' });
    
        const videojuegosEncontrados = await VideoJuego.find({ _id: listaDeJuegos.map(juego => juego._id) });

        if(videojuegosEncontrados.length < listaDeJuegos.length)
            return res.status(404).send({ mensaje: 'Uno o mas juegos que se intentaron sumar al pedido no existen' });

        const pedido = new Pedido({ userId, listaDeJuegos });
        const pedidoCreado = await pedido.save();

        res.status(200).send({ id: pedidoCreado.id, mensaje: 'Se creo el pedido' });
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

module.exports = { pedidoGet, pedidoPost };
