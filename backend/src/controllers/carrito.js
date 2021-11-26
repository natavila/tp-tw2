const { Usuario } = require('../models/usuario');
const { Carrito } = require('../models/carrito');
const { VideoJuego } = require('../models/video-juego');

/*
 * Controlador para listar un carrito por id del usuario
*/
const carritoGet = async (req, res) => {

    const { userId } = req;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    try {
        const carrito = await Carrito.findOne({ userId: userId });

        if(!carrito)
            return res.status(404).send({ mensaje: 'No existe un carrito asociado al usuario ', userId });

        res.status(200).send(carrito);
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Controlador para crear un carrito
*/
const carritoPost = async (req, res) => {

    const { userId } = req;
    const { listaDeJuegos } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    try {
        const usuario = await Usuario.findById(userId);

        if(!usuario)
            return res.status(404).send({ mensaje: 'No existe el usuario que se trato asignar al carrito' });

        const existeCarrito = await Carrito.findOne({ userId: userId });

        if(existeCarrito)
            return res.status(400).send({ mensaje: `El usuario ${userId} tiene un carrito activo`});
    
        const videojuegosEncontrados = await VideoJuego.find({ _id: listaDeJuegos });

        if(videojuegosEncontrados.length < listaDeJuegos.length)
            return res.status(404).send({ mensaje: 'Uno o mas juegos que se intentaron sumar al carrito no existen' });

        const carrito = new Carrito({ idUsuario: userId, listaDeJuegos: videojuegosEncontrados });
        const carritoCreado = await carrito.save();

        res.status(200).send({ id: carritoCreado.id, mensaje: 'Se creo el carrito' });
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Controlador para agregar un video juego al carrito
*/
const agregarVideoJuegoAlCarrito = async (req, res) => {

    const { userId } = req;
    const { idVideoJuego } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    if(!esObjectIdValido(idVideoJuego))
        return res.status(400).send({mensaje: `El identificador ${idVideoJuego} del video juego es invalido`});

    try {
        const usuario = await Usuario.findById(userId);
        if(!usuario)
            return res.status(404).send({ mensaje: `No existe el usuario ${userId}` });

        const videoJuego = await VideoJuego.findById(idVideoJuego);
        if(!videoJuego)
            return res.status(404).send({ mensaje: `No existe el video juego ${idVideoJuego}` })

        const carritoExistente = await Carrito.findOne({ idUsuario: userId });

        if(!carritoExistente) {

            const carritoCreado = new Carrito({ idUsuario: userId, listaDeJuegos: [videoJuego] });
            await carritoCreado.save();
        }else {

            let existeElJuegoEnElCarrito = false;

            carritoExistente.listaDeJuegos.forEach(juego => {
                if(juego._id.toString() === idVideoJuego)
                    existeElJuegoEnElCarrito = true;
            });

            if(existeElJuegoEnElCarrito)
                return res.status(400).send({ mensaje: `Ya existe el video juego ${idVideoJuego} en el carrito`})

            carritoExistente.listaDeJuegos.push(videoJuego);
            await carritoExistente.save();
        }

        return res.status(200).send({ mensaje: `Se agrego el video juego ${idVideoJuego} al carrito`})
    } catch (error) {
        res.status(500).send({ mensaje: error.message });
    }  
};

/*
 * Controlador para eliminar un video juego al carrito
*/
const eliminarVideoJuegoDelCarrito = async (req, res) => {

    const { userId } = req;
    const { idVideoJuego } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    if(!esObjectIdValido(idVideoJuego))
        return res.status(400).send({mensaje: `El identificador ${idVideoJuego} del video juego es invalido`});

    try {
        const usuario = await Usuario.findById(userId);
        if(!usuario)
            return res.status(404).send({ mensaje: `No existe el usuario ${userId}` });

        const videoJuego = await VideoJuego.findById(idVideoJuego);
        if(!videoJuego)
            return res.status(404).send({ mensaje: `No existe el video juego ${idVideoJuego}` })

        const carrito = await Carrito.findOne({ idUsuario: userId });
        if(!carrito)
            return res.status(404).send({ mensaje: `El usuario ${userId} no posee un carrito activo` })

        const existeElJuegoEnElCarrito = carrito.listaDeJuegos.find(juego => juego._id.toString() === idVideoJuego);

        if(!existeElJuegoEnElCarrito)
            return res.status(400).send({ mensaje: `No existe el juego ${idVideoJuego} dentro en el carrito`})

        const nuevaListaDeJuegos = carrito.listaDeJuegos.filter(juego => {
            return juego._id.toString() !== idVideoJuego;
        })

        carrito.listaDeJuegos = nuevaListaDeJuegos;
        carrito.markModified('listaDeJuegos');

        await carrito.save();

        return res.status(200).send({ mensaje: `Se elimino el video juego ${idVideoJuego} del carrito`});
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

module.exports = { carritoGet, carritoPost, agregarVideoJuegoAlCarrito, eliminarVideoJuegoDelCarrito };
