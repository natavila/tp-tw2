const express = require('express');
const router = express.Router();
const { carritoGet, agregarVideoJuegoAlCarrito, eliminarVideoJuegoDelCarrito, confirmarCarrito } = require('../controllers/carrito')
const { validarJwt } = require('../helpers/validar-jwt');

// Necesitan autenticacion
router.get('/', validarJwt, carritoGet);
router.post('/agregar-al-carrito', validarJwt, agregarVideoJuegoAlCarrito);
router.post('/eliminar-del-carrito', validarJwt, eliminarVideoJuegoDelCarrito);
router.post('/confirmar-carrito', validarJwt, confirmarCarrito);

module.exports = router;
