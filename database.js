const mongoose = require('mongoose');

let startDb = function () {
  // return function () {
    mongoose.connect('mongodb://localhost/bank', { useNewUrlParser: true });

    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Database connected successfully');
    });
  // }
}

startDb();

module.exports = startDb;

