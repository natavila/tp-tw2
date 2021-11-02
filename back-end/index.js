const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db.js');
var usuariosController = require('./controllers/usuariosController.js');

var app = express();
app.use(express.json());

app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/usuarios', usuariosController);