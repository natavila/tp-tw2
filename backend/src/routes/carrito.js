const express = require('express');
const router = express.Router();
const { carritoGet, carritoPost, agregarVideoJuegoAlCarrito, eliminarVideoJuegoDelCarrito } = require('../controllers/carrito')
const { validarJwt } = require('../helpers/validar-jwt');

// Necesitan autenticacion
router.get('/', validarJwt, carritoGet);
router.post('/', validarJwt, carritoPost);
router.post('/agregar-al-carrito', validarJwt, agregarVideoJuegoAlCarrito);
router.post('/eliminar-del-carrito', validarJwt, eliminarVideoJuegoDelCarrito);

module.exports = router;
