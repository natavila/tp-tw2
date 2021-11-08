const mongoose = require('mongoose');

const puertoDB = '27017';
const nombreDB = 'videojuegosdb';

const dbConexion = async () => {

    try {

        await mongoose.connect(`mongodb://localhost:${puertoDB}/${nombreDB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Conexion exitosa con la base de datos.')

    } catch (error) {
        console.log('Error en la conexion con la base de datos, ERROR: ', error);
        throw new Error('Error en la conexion con la base de datos, ERROR: ', error);
    }
}

module.exports = { dbConexion }
