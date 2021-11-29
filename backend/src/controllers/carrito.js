const { Usuario } = require('../models/usuario');
const { Carrito } = require('../models/carrito');
const { VideoJuego } = require('../models/video-juego');
const { Pedido } = require('../models/pedido');
const e = require('express');

/*
 * Controlador para listar un carrito a travez del id del usuario
*/
const carritoGet = (req, res) => {
    const { userId } = req;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    Carrito.findOne({ idUsuario: userId })
    .then(carrito => {
        if(!carrito)
            return res.status(404).send({ mensaje: `No existe un carrito asociado al usuario ${userId}` });

        let precioTotal = 0;

        carrito.listaDeJuegos.forEach(juego => {
            precioTotal += juego.precio;
        });

        res.status(200).send({ ...carrito._doc, precioTotal });
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

/*
 * Controlador para agregar un video juego al carrito
*/
const agregarVideoJuegoAlCarrito = (req, res) => {
    const { userId } = req;
    const { idVideoJuego } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({ mensaje: `El identificador ${userId} del usuario es invalido` });

    if(!idVideoJuego)
        return res.status(400).send({ mensaje: `Debe enviar el video juego para agregar al carrito` });

    if(!esObjectIdValido(idVideoJuego))
        return res.status(400).send({ mensaje: `El identificador ${idVideoJuego} del video juego es invalido` });

    Usuario.findById(userId)
    .then(usuario => {
        if(!usuario)
            return res.status(404).send({ mensaje: `No existe el usuario ${userId}` });
        else{
            VideoJuego.findById(idVideoJuego)
            .then(videoJuego => {
                if(!videoJuego)
                    return res.status(404).send({ mensaje: `No existe el video juego ${idVideoJuego}` })
                else{
                    Carrito.findOne({ idUsuario: userId })
                    .then(carrito => {
                        if(!carrito) {
                            const carritoCreado = new Carrito({ idUsuario: userId, listaDeJuegos: [videoJuego] });
                            res.status(200).send({ mensaje: `Se agrego el video juego ${idVideoJuego} al carrito` });
                            return carritoCreado.save();
                        }else{
                            let existeElJuegoEnElCarrito = false;

                            carrito.listaDeJuegos.forEach(juego => {
                                if(juego._id.toString() === idVideoJuego)
                                    existeElJuegoEnElCarrito = true;
                            });

                            if(existeElJuegoEnElCarrito)
                                return res.status(400).send({ mensaje: `Ya existe el video juego ${idVideoJuego} en el carrito` })
                            else{
                                carrito.listaDeJuegos.push(videoJuego);
                                res.status(200).send({ mensaje: `Se agrego el video juego ${idVideoJuego} al carrito` })
                                return carrito.save();
                            }
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
                    })
                }
            })
            .catch(error => {
                res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
            })
        }
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

/*
 * Controlador para eliminar un video juego del carrito
*/
const eliminarVideoJuegoDelCarrito = (req, res) => {
    const { userId } = req;
    const { idVideoJuego } = req.body;

    if(!esObjectIdValido(userId))
        return res.status(400).send({ mensaje: `El identificador ${userId} del usuario es invalido` });

    if(!idVideoJuego)
        return res.status(400).send({ mensaje: `Debe enviar el video juego a eliminar del carrito` });

    if(!esObjectIdValido(idVideoJuego))
        return res.status(400).send({ mensaje: `El identificador ${idVideoJuego} del video juego es invalido` });

    Usuario.findById(userId)
    .then(usuario => {
        if(!usuario)
            return res.status(404).send({ mensaje: `No existe el usuario ${userId}` });
        else{
            VideoJuego.findById(idVideoJuego)
            .then(videoJuego => {
                if(!videoJuego)
                    return res.status(404).send({ mensaje: `No existe el video juego ${idVideoJuego}` })
                else{
                    Carrito.findOne({ idUsuario: userId })
                    .then(carrito => {
                        if(!carrito)
                            return res.status(404).send({ mensaje: `El usuario ${userId} no posee un carrito activo` })
                        else{
                            const existeElJuegoEnElCarrito = carrito.listaDeJuegos.find(juego => juego._id.toString() === idVideoJuego);

                            if(!existeElJuegoEnElCarrito)
                                return res.status(400).send({ mensaje: `No existe el juego ${idVideoJuego} dentro del carrito` })

                            const nuevaListaDeJuegos = carrito.listaDeJuegos.filter(juego => {
                                return juego._id.toString() !== idVideoJuego;
                            })

                            carrito.listaDeJuegos = nuevaListaDeJuegos;
                            carrito.markModified('listaDeJuegos');

                            res.status(200).send({ mensaje: `Se elimino el video juego ${idVideoJuego} del carrito` });
                            return carrito.save();
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
                    })
                }
            })
            .catch(error => {
                res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
            })
        }
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
};

/*
 * Controlador para confirmar los items del carrito y crear la ordem (se elimina el carrito y se plasman los juegos en la orden)
*/
const confirmarCarrito = (req, res) => {
    const { userId } = req;

    if(!esObjectIdValido(userId))
        return res.status(400).send({mensaje: `El identificador ${userId} del usuario es invalido`});

    Carrito.findOne({ userId: userId })
    .then(carrito => {
        if(!carrito)
            return res.status(404).send({ mensaje: `No existe un carrito asociado al usuario ${userId}` });
        else{
            const { listaDeJuegos, ...restoDelCarrito } = carrito;

            if(!listaDeJuegos?.length)
                return res.status(400).send({ mensaje: 'Para confirmar el carrito y crear el pedido, el mismo debe contener al menos un video juego' });
            else{
                Carrito.findOneAndDelete({ userId: userId })
                .then(() => {
                    const pedido = new Pedido({ idUsuario: userId, listaDeJuegos });
                    return pedido.save();
                })
                .then(pedido => {
                    res.status(200).send({ mensaje: `Se creo el pedido del usuario ${userId}` });
                })
                .catch(error => {
                    res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
                })
            }
        }
    })
    .catch(error => {
        res.status(500).send({ mensaje: 'Error interno, intente de nuevo', error });
    })
}

/*
 * Helpers
*/
const esObjectIdValido = id => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = { carritoGet, agregarVideoJuegoAlCarrito, eliminarVideoJuegoDelCarrito, confirmarCarrito };
