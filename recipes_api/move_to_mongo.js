const mongoose = require('mongoose')
const {ingredientSchema, Ingredient, drinkSchema, Drink, mongourl} = require('./MongoConn')
var fs = require('fs')

mongoose.connect(mongourl, { useNewUrlParser: true })

var data = JSON.parse(fs.readFileSync("data.json"))

data.forEach(recipe => {
	recipe.ingredients.forEach(ing => {
		Ingredient.find({name: ing.name})
			.then(result => {
				if(result.length){
					console.log(ing.name, "already exists");
				}else{
					var i = new Ingredient({
						supply: false,
						name: ing.name,
						urlName: encodeURIComponent(ing.name)
					});
					i.save().then(() => console.log(ing.name, "saved"))
				}
			})
	})

	Drink.find({name: recipe.name})
		.then(result => {
			if(result.length){
				console.log(recipe.name, "already exists");
			}else{
				var d = new Drink({
					tags: [],
					oldId: 0,
					instructions: recipe.instructions,
					name: recipe.name,
					glass: recipe.glass,
					imageUrl: recipe.imageUrl,
					ingredients: recipe.ingredients
				});
				d.save().then(() => console.log(recipe.name, "saved"))
			}
		})
}