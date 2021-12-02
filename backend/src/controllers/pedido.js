const { Pedido } = require('../models/pedido');

/*
 * Controlador para listar un pedido por id del usuario
*/
const pedidoGet = (req, res) => {
    const { userId } = req;

    if(!esObjectIdValido(userId))
        return res.status(400).send({ mensaje: `El identificador ${userId} del usuario es invalido` });

    Pedido.findOne({ idUsuario: userId })
    .then(pedido => {
        if(!pedido)
            return res.status(404).send({ mensaje: `No existe un pedido asociado al usuario ${userId}` });

        let precioTotal = 0;

        pedido.listaDeJuegos.forEach(juego => {
            precioTotal += juego.precio;
        });

        res.status(200).send({ ...pedido._doc, precioTotal });
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

/*
 * Helpers
*/
const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = { pedidoGet };
