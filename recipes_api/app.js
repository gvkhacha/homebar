require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');

const UserController = require('./controllers/UserController');
const DrinkController = require('./controllers/DrinkController');
const IngredientController = require('./controllers/IngredientController');


require('./config/passport');
app.use(cors({
    credentials: true
}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "session"
    }),
    cookie: {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}))


app.use(passport.initialize());
app.use(passport.session());

app.use('/users', UserController);
app.use('/drink', DrinkController);
app.use('/ingredients', IngredientController);

module.exports = app;