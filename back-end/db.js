const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/videojuegosdb', (err) => {
    if(!err)
        console.log('MongoDB connection successed.');
    else
        console.log('Error in database conection: ' + JASON.stringify(err, undefined, 2));
});

module.exports = mongoose;