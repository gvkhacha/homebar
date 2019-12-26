const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const auth = require('./auth');


const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.post('/', auth.optional, (req, res) => {
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


module.exports = router;