const express = require('express');
const router = express.Router();
const { videoJuegoList, videoJuegoGet, videoJuegoPorCategoriaList } = require('../controllers/video-juego')
const { validarJwt } = require('../helpers/validar-jwt');

// No necesitan autenticacion
router.get('/', videoJuegoList);
router.get('/buscar-por-categoria/:categoria', videoJuegoPorCategoriaList);

// Necesitan autenticacion
router.get('/:id', validarJwt, videoJuegoGet);

module.exports = router;
