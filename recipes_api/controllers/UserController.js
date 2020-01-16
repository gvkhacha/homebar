const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/User');


const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


function authenticationMiddleware(){
    return function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.status(401).send();
    }
}


router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    User.find({}, (err, data)=>{
        if(err){
            return res.status(500).send("Error in retrieving User from database");
        }
        res.status(200).send(data);
    })
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("log in sent");
    res.status(200).send(req.user.authJson());
});

router.get('/secure', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("secure page accessed");
    console.log(req.isAuthenticated());
    res.status(200).send("hello");
});

router.get('/logout', authenticationMiddleware(), (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/users');
    })
})

module.exports = router;