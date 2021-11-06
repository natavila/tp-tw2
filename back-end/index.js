const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db.js');

var usuariosController = require('./controllers/usuario.js');
var carritosController = require('./controllers/carrito.js');
var videojuegosController = require('./controllers/videojuego.js');

var app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.listen(3000, () => console.log('Server started at port: 3000'));


app.use('/usuario', usuariosController);
app.use('/carrito', carritosController);
app.use('/videojuego', videojuegosController);

