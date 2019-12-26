const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./controllers/UserController');
require('./config/passport');

app.use('/users', UserController);

module.exports = app;