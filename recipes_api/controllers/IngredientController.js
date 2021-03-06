const express = require('express');
const bodyParser = require('body-parser');

const Ingredient = require('../models/Ingredient');

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

//get all ingredients
router.get('/', (req, res) => {
    Ingredient.find({}, (err, data)=>{
        if(err){
            return res.status(500).send("Error in retrieving Ingredient from database");
        }
        res.status(200).send(data);
    })
})

//get all available ingredients
router.get('/available', (req, res) => {
    Ingredient.find({available: true}, (err, data)=>{
        if(err){
            return res.status(500).send("Error in retrieving Ingredient from database");
        }
        res.status(200).send(data);
    })
})

//add new ingredient - dev only
router.post('/', authenticationMiddleware(), (req, res) => {
    const ingredient = new Ingredient(req.body);
    ingredient.save((err, ingr) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(ingr);
        }
    })
})

router.patch('/', authenticationMiddleware(), (req, res) => {
    const avail = req.body.true;
    const unavailable = req.body.false;
    console.log(avail);
    console.log(unavailable);
    let success = true;

    Ingredient.updateMany(
        {_id: {$in: avail}},
        {$set: {available: true}},
        (err, data) => {
            if(err){ success = false;}
        }
    )

    Ingredient.updateMany(
        {_id: {$in: unavailable}},
        {$set: {available: false}},
        (err, data) => {
            if(err){ success = false;}
        }
    )

    if(success){
        res.status(200).send();
    }else{
        res.status(500).send();
    }
})

router.delete('/:id', authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    Ingredient.findOneAndDelete({_id: id}, (err, data) => {
        if(err){
            return res.status(500).send("Error in deleting Ingredient from database");
        }
        res.status(200).send(data);
    })
})

module.exports = router;