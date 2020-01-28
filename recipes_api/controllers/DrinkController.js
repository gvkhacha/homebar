const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const Drink = require('../models/Drink');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send();
    }
}


// Get all drinks
router.get('/', (req, res) => {
    Drink.find({}, (err, data) => {
        if (err) {
            return res.status(500).send("Error in retrieving User from database");
        }
        res.status(200).send(data);
    })
});

// Add new drink
router.post('/', (req, res) => {
    const drink = new Drink(req.body.drink);

    drink.save((err, drink) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(drink);
        }
    })
});

// router.get('/id/:id', (req, res) =>{

// });



module.exports = router;