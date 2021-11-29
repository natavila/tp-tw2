const JWT = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');

const validarJwt = (req, res, next) => {
    const mensaje = 'Solicitud denegada - Unauthorized';

    if(!req.headers.authorization || !req.headers.authorization.split(' ')[1])
        return res.status(401).send({ mensaje })

    const token = req.headers.authorization.split(' ')[1];

    let payload;

    try {
        payload = JWT.verify(token, 'secretkey');
    } catch (error) {
        return res.status(400).send({ mensaje })
    }

    Usuario.findById(payload._id)
    .then(usuario => {
        if(!usuario)
            return res.status(401).send({ mensaje });
    
        req.userId = payload._id;
        next();
    })
    .catch(error => {
        return res.status(400).send({ mensaje: 'Error', error })
    })
}

module.exports = { validarJwt }
