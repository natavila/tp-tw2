const JWT = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');

const validarJwt = async (req, res, next) => {

    if(!req.headers.authorization || req.headers.authorization.split(' ')[1] === null)
        return res.status(401).send({ mensaje: 'Solicitud denegada - Unauthorized' })

    const token = req.headers.authorization.split(' ')[1];

    try {
        const payload = JWT.verify(token, 'secretkey');

        const usuario = await Usuario.findById(payload._id);
        
        if(!usuario)
            return res.status(401).send({ mensaje: 'Solicitud denegada - Unauthorized' });
        
        req.userId = payload._id;

        next();
    } catch (error) {
        return res.status(400).send({ mensaje: 'Token invalido' })
    }
}

module.exports = { validarJwt }
