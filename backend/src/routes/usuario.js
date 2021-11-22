const express = require('express');
const router = express.Router();
const { usuarioGet, usuarioList, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario')

router.get('/', usuarioList);
router.get('/:id', usuarioGet);
router.post('/', usuarioPost);
router.post('/:codigo', usuarioPost);
router.put('/:id', usuarioPut);
router.delete('/:id', usuarioDelete);

module.exports = router;

