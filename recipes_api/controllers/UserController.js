const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/User');
const auth = require('./auth');


const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


function authenticationMiddleware(){
    return function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
}


router.post('/', auth.optional, (req, res) => {
    console.log(req.body)

    const u = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    User.create(u, (err, user) => {
        if(err){
            return res.status(500).send("Error saving user");
        }
        res.status(200).send(user.authJson());
    })
});

router.get('/', auth.required, (req, res) => {
    User.find({}, (err, data)=>{
        if(err){
            return res.status(500).send("Error in retrieving User from database");
        }
        res.status(200).send(data);
    })
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("log in sent");
    res.status(200).send(req.user);
});

router.get('/secure', authenticationMiddleware(), (req, res) => {
    console.log("secure page accessed");
    console.log(req.isAuthenticated());
    res.status(200).send("hello");
});

module.exports = router;