const { Pedido } = require('../models/pedido');

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
 * Helpers
*/
const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = { pedidoGet };
