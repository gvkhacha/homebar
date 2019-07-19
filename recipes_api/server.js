const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {Drink, Ingredient, mongourl} = require('./MongoConn')


app.get('/all', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })

	Drink.find({}).then(result => {
		res.json(result);
		mongoose.connection.close()
	})
})

app.get('/supply', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Ingredient.find({supply: true}).then(result => {
		res.json(result);
		mongoose.connection.close();
	})
})

app.route('/supply/:name')
	.get((req, res) => {
		mongoose.connect(mongourl, { useNewUrlParser: true })
		const name = req.params.name;
		Ingredient.find({urlName: name}).then(result => {
			res.json(result);
			mongoose.connection.close();
		})
	})
	.post((req, res) => {
		mongoose.connect(mongourl, { useNewUrlParser: true })
		const name = req.params.name;
		Ingredient.update({name: name}, {supply: true}, function(err){
			if(err){
				return res.send(500, {error: err});
			}
			return res.send("Success");
		})
	})
	.delete((req, res) => {
		mongoose.connect(mongourl, { useNewUrlParser: true })
		const name = req.params.name;
		Ingredient.update({name: name}, {supply: false}, function(err){
			if(err){
					return res.send(500, {error: err});
				}
				return res.send("Success");
		})
	})

app.get('/available', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Ingredient.find({supply: true})
		.then(result => result.map(obj => obj.name))
		.then(ings => {
			console.log(ings);
			Drink.find({})
				.then(result => {
					return result.filter(d => {
						for(var i = 0; i < d.ingredients.length; i++){
							if(!(ings.includes(d.ingredients[i].name))){
								return false;
							}
						}
						return true;
					})
				}).then(filtered => {
					res.json(filtered);
					mongoose.connection.close();
				})
		})
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})