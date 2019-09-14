const mongoose = require('mongoose')
const {ingredientSchema, Ingredient, drinkSchema, Drink, mongourl} = require('./MongoConn')
var fs = require('fs')

mongoose.connect(mongourl, { useNewUrlParser: true })

Drink.find({})
    .then(result => {
        console.log(result);
        fs.writeFile("recipes.json", JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        }); 
    })