const mongoose = require("mongoose");
const customer = require('./customer');
//const Schema = mongoose.Schema;
const account = mongoose.model(
    "account",
new mongoose.Schema({
    accountNumber: Number,
    balance: Number,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }

 })
);
// const Account = mongoose.model("account", AccountSchema);

module.exports = account;