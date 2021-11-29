const { VideoJuego } = require('../models/video-juego');

/*
 * Controlador para listar todos los videojuegos
*/
const videoJuegoList = (req, res) => {
    VideoJuego.find()
    .then(videoJuegos => {
        res.status(200).send(videoJuegos);
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    });
};

/*
 * Controlador para listar un videojuego por id
*/
const videoJuegoGet = (req, res) => {
    const { id } = req.params;

    if(!esObjectIdValido(id))
        return res.status(400).send({ mensaje: `El identificador ${id} es invalido` });

    VideoJuego.findById(id)
    .then(videoJuego => {
        if(!videoJuego)
            return res.status(404).send({ mensaje: `No existe el videoJuego ${id}` });

        res.status(200).send(videoJuego);
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

module.exports = { videoJuegoList, videoJuegoGet }
