const express = require('express');
const { usuarioGet, usuarioList, usuarioPost, usuarioPut, usuarioDelete, usuarioLogin } = require('../controllers/usuario');
const { validarJwt } = require('../helpers/validar-jwt');

const router = express.Router();

router.get('/', usuarioList);
router.get('/:id', usuarioGet);
router.post('/', usuarioPost);
router.post('/:codigo', usuarioPost);
router.put('/:id', usuarioPut);
router.post('/login', usuarioLogin);
router.put('/:id', validarJwt, usuarioPut);
router.delete('/:id', usuarioDelete);

module.exports = router;

