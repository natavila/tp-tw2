const express = require('express');
const router = express.Router();
const { usuarioGet, usuarioList, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario')

router.get('/:id', usuarioGet);
router.get('/', usuarioList);
router.post('/', usuarioPost);
router.put('/:id', usuarioPut);
router.delete('/:id', usuarioDelete);

module.exports = router;
