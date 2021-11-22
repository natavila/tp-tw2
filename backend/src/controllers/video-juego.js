const { VideoJuego } = require('../models/video-juego');

/*
 * Controlador para listar todos los videojuegos
*/
const videoJuegoList = async (req, res) => {

    try {
        const videojuegos = await VideoJuego.find();
        res.status(200).send(videojuegos);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al listar videojuegos", error });
    }
};

/*
 * Controlador para listar un videojuego por id
*/
const videoJuegoGet = async (req, res) => {

    const { id } = req.params;

    if(!esObjectIdValido(id)) {
        res.status(400).send({mensaje: `El identificador ${id} es invalido`});
        return;
    }

    try {
        const videojuego = await VideoJuego.findById(id);

        if(!videojuego)
            res.status(404).send({ mensaje: "No existe el videojuego " + id });
        else
            res.status(200).send(videojuego);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al buscar videojuego", error });
    }
};

/*
 * Controlador para listar los videojuegos de una categoria
*/
const videoJuegoPorCategoriaList = async (req, res) => {

    const { categoria } = req.params;

    try {
        const videojuegos = await VideoJuego.find({ categoria: categoria });

        if(videojuegos.length == 0)
            res.status(404).send({ mensaje: "No hay juegos con la categoria " + categoria });
        else
            res.status(200).send(videojuegos);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al buscar juegos por categoria ", error });
    }
};

const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = { videoJuegoList, videoJuegoGet, videoJuegoPorCategoriaList }
