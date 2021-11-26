const express = require('express');
const router = express.Router();
const { pedidoGet, pedidoPost } = require('../controllers/pedido');
const { validarJwt } = require('../helpers/validar-jwt');

// Necesitan autenticacion
router.get('/', validarJwt, pedidoGet);
router.post('/', validarJwt, pedidoPost);

module.exports = router;
