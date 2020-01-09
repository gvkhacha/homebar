require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const UserController = require('./controllers/UserController');


require('./config/passport');
app.use(cors({
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "session"
    })
}))


app.use(passport.initialize());
app.use(passport.session());

app.use('/users', UserController);

module.exports = app;