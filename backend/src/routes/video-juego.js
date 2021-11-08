const express = require('express');
const router = express.Router();
const { videoJuegoList, videoJuegoGet, videoJuegoPorCategoriaList } = require('../controllers/video-juego')

router.get('/', videoJuegoList);
router.get('/:id', videoJuegoGet);
router.get('/buscar-por-categoria/:categoria', videoJuegoPorCategoriaList);

module.exports = router;
