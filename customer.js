const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
 const customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
      name: String,
      age: Number,
      email: String,
      password: String,
     account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
      } 
    })
  );
 // module.exports = mongoose.model("customer", CustomerSchema);
 module.exports = customer;
    