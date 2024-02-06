const express = require('express');
const customer = require('./customer');
const account = require('./account');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 
const secret = require("./secret");
const jwt = require('jsonwebtoken');
const token = require('./token');
//
router.post('/Customer', async (req, res) => {
  try {
    const { name, email, age, password, account} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds=10);
    console.log(hashedPassword);
    const Customer = new customer({
      name,
       age,
       email,
       password: hashedPassword,

    });
       await Customer.save();
    res.send(Customer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/Account', async (req, res) => {
  const { accountNumber, balance,customer} = req.body;
  try {
   // const { accountNumber, balance, customerId} = req.body;
    //const Customer = await customer.findById(customerId);
    //const Customer = req.customer;
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const Account = new account({ 
      accountNumber,
      balance,
      
     Customer: req.customer
    });
       await Account.save();
    res.send(Account);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
 
});

// customer login
 router.post('/Customer/login', async (req, res) => {
  const { name, password } = req.body;
 //console.log(name);
  // Find the user by username
  const Customer = await customer.findOne({name});

  if (!Customer) {
    return res.status(401).json({ error: 'Invalid username ' });
  }

  // Compare the provided password with the hashed password in the user data
//console.log(password, Customer);
  const passwordMatch = await bcrypt.compare( password, Customer.password);
 
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }
    
// console.log(passwordMatch);
  // Generate a JWT token
  const token = jwt.sign({ CustomerId:Customer._id, name : Customer.name , age: Customer.age, email:Customer.email}, "secret",  { expiresIn: '1h' }); 
  res.json({ message: 'Login successful', token});
});
//


///  to get customer using token

router.get('/Customer/profile', token,  async (req, res) => {
 const Customer = req.customer;
  res.json({ message: 'Token is valid', Customer});

});

/// get account

router.get('/Account/:id', token, async (req, res) => {
const {id} = req.customer.CustomerId;
 try {
  // const {id} = req.params;
   const Account = await account.find({customer: id});
       res.send(Account);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
//

//

router.put('/Account/:id', token,   async (req, res) => {
  const { id } = req.params//customer.CustomerId;
  const { balance } = req.body;

  try {
    const Account = await account.findByIdAndUpdate(id,{ $inc: { balance}}, { new: true });
    res.send(Account);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;