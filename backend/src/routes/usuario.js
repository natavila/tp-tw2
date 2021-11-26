const express = require('express');
const { usuarioGet, usuarioList, usuarioPost, usuarioPut, usuarioDelete, usuarioLogin } = require('../controllers/usuario');
const { validarJwt } = require('../helpers/validar-jwt');

const router = express.Router();

// No necesitan autenticacion
router.post('/', usuarioPost);
router.post('/login', usuarioLogin);

// Necesitan autenticacion
router.get('/', validarJwt, usuarioList);
router.get('/:id', validarJwt, usuarioGet);
router.put('/:id', validarJwt, usuarioPut);
router.delete('/:id', validarJwt, usuarioDelete);

module.exports = router;

