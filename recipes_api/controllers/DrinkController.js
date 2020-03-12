const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const Drink = require('../models/Drink');

const router = express.Router();
let orderedDrinks = [];

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
    drink.id = null;
    if(drink.img === ''){
        drink.img = "https://static.vinepair.com/wp-content/uploads/2016/11/cocktailsubs-internal-header.jpg";
    }

    drink.save((err, drink) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(drink);
        }
    })
});

router.get('/order', (req, res) => {
    Drink.find({
        '_id': {
            $in: orderedDrinks.map(id => mongoose.Types.ObjectId(id))
        }
    }, (err, docs) => {
        if(err){
            return res.status(500).send(err);
        }
        res.status(200).send(docs);
    })
})

router.post('/order/:id', (req, res) => {
    const id = req.params.id;
    orderedDrinks.push(id);
    Drink.find({
        '_id': {
            $in: orderedDrinks.map(id => mongoose.Types.ObjectId(id))
        }
    }, (err, docs) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(docs);
    })
})

router.delete('/order/:id', (req, res) => {
    const id = req.params.id;
    const index = orderedDrinks.indexOf(id);
    if(index != -1){
        orderedDrinks.splice(index, 1);
        Drink.find({
            '_id': {
                $in: orderedDrinks.map(id => mongoose.Types.ObjectId(id))
            }
        }, (err, docs) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(docs);
        })
    }else{
        res.status(404).send("Drink not currently added to orders");
    }
})


module.exports = router;