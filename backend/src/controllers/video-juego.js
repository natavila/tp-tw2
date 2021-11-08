const { VideoJuego } = require('../models/video-juego');

const videoJuegoList = async (req, res) => {

    try {

        const videojuego = await VideoJuego.find();
        res.send(videojuego);
    } catch (error) {
        
        res.send({ mensaje: "Error al listar videojuegos", error });
    }
};

const videoJuegoGet = async (req, res) => {

    const { id } = req.params;

    try {

        const videojuegoEncontrado = await VideoJuego.findById(id);

        if(!videojuegoEncontrado)
            res.send({ mensaje: "No existe el videojuego " + id });
        else
            res.send(videojuegoEncontrado);
    } catch (error) {
        
        res.send({ mensaje: "Error al buscar videojuego", error });
    }
    
};

const videoJuegoPorCategoriaList = async (req, res) => {

    const { categoria } = req.params;

    try {
        
        const videojuegos = await VideoJuego.find({ categoria: categoria });

        if(videojuegos.length == 0)
            res.send({ mensaje: "No hay juegos con la categoria " + categoria });
        else
            res.send(videojuegos);
            
    } catch (error) {
        res.send({ mensaje: "Error al buscar juegos por categoria ", error });
    }
};

module.exports = { videoJuegoList, videoJuegoGet, videoJuegoPorCategoriaList }
