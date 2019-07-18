const axios = require('axios')
const mongoose = require('mongoose')
const {ingredientSchema, Ingredient, drinkSchema, Drink, mongourl} = require('models')

mongoose.connect(mongourl, { useNewUrlParser: true })

let instance = axios.create({
	baseURL: "https://www.thecocktaildb.com/api/json/v1/1"
})

let ingredientIds = {};
getIngId = function(name){
	if (!(name in ingredientIds)){
		ingredientIds[name] = Math.random().toString(36).substr(2, 9);
	}
	return ingredientIds[name]
}



instance.get('/filter.php?a=Alcoholic')
	.then(response => response.data.drinks)
	.then(drinks => {
		drinks.map(drink => drink.idDrink) //only need the id to get more info
			.forEach(id => {
				instance.get(`/lookup.php?i=${id}`)
					.then(result => result.data.drinks[0])
					.then(drink => {
						const ingredients = [];
						for(var i = 1; i < 16; i++){
							const iName = drink["strIngredient" + i];
							if(iName == ''){
								break;
							}
							const iMeasure = drink["strMeasure" + i];
							ingredients.push(new Ingredient({
								id: getIngId(iName), 
								name: iName,
								measure: iMeasure
							}))
						}
						const tags = drink.strTags != null ? drink.strTags.split(',') : [];
						const instructions = drink.strInstructions != null ? drink.strInstructions.split('. ') : [];
						const newDrink = new Drink({
							oldId: drink.idDrink,
							name: drink.strDrink,
							glass: drink.strGlass,
							imageUrl: drink.strDrinkThumb,
							ingredients: ingredients,
							tags: tags,
							instructions: instructions
						})
						newDrink.save().then(result => {
							console.log("drink saved");
						})
					})
					.catch(err => {
						console.log(err);

					})
			})
		})