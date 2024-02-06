const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const router = require('./router');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const ngrok = require("ngrok");
const app = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, () => {
  console.log('Server started on port 8080');
  // db();
})
// ngrok.listen(app).then(() => {
//   console.log("established listener at: " + app.listener.url(8080));
// });