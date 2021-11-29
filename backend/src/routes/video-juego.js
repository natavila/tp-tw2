const express = require('express');
const router = express.Router();
const { videoJuegoList, videoJuegoGet } = require('../controllers/video-juego')
const { validarJwt } = require('../helpers/validar-jwt');

// No necesitan autenticacion
router.get('/', videoJuegoList);

// Necesitan autenticacion
router.get('/:id', validarJwt, videoJuegoGet);

module.exports = router;
