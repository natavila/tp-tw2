const express = require('express');
const router = express.Router();
const { carritoPost } = require('../controllers/carrito')

router.post('/', carritoPost);

module.exports = router;
