const express = require('express');
const { usuarioList, usuarioGet, usuarioPost, usuarioLogin } = require('../controllers/usuario');
const { validarJwt } = require('../helpers/validar-jwt');

const router = express.Router();

// No necesitan autenticacion
router.post('/', usuarioPost);
router.post('/login', usuarioLogin);

// Necesitan autenticacion
router.get('/', validarJwt, usuarioList);
router.get('/:id', validarJwt, usuarioGet);

module.exports = router;
