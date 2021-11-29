const express = require('express');
const router = express.Router();
const { pedidoGet } = require('../controllers/pedido');
const { validarJwt } = require('../helpers/validar-jwt');

// Necesitan autenticacion
router.get('/', validarJwt, pedidoGet);

module.exports = router;
