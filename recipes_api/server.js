const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
var bodyParser = require('body-parser');
const {Drink, Ingredient, mongourl} = require('./MongoConn')


app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
		}).then(() => mongoose.connection.close());
	})
	.delete((req, res) => {
		mongoose.connect(mongourl, { useNewUrlParser: true })
		const name = req.params.name;
		Ingredient.update({name: name}, {supply: false}, function(err){
			if(err){
					return res.send(500, {error: err});
				}
				return res.send("Success");
		}).then(() => mongoose.connection.close());
	})

app.get('/available', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Ingredient.find({supply: true})
		.then(result => result.map(obj => obj.name.toLowerCase()))
		.then(ings => {
			Drink.find({})
				.then(result => {
					return result.filter(d => {
						for(var i = 0; i < d.ingredients.length; i++){
							if(!(ings.includes(d.ingredients[i].name.toLowerCase()))){
								return false;
							}
						}
						return true;
					})
				}).then(filtered => {
					res.json(filtered);
				})
				.then(() => mongoose.connection.close())
			})
		// .then(() => {mongoose.connection.close();})
})

app.get('/ingredients', (req, res) => {
	mongoose.connect(mongourl, {useNewUrlParser: true})
	Ingredient.find({})
		.then(result => {
			res.json(result)
			mongoose.connection.close();
		})
})

app.post('/recipe', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })
	console.log(req.body);
	Drink.find({ name: res.body.name })
		.then(result => {
			if (result.length) {
				console.log(res.body.name, "already exists");
			} else {
				var d = new Drink({
					tags: [],
					oldId: 0,
					instructions: res.body.instructions,
					name: res.body.name,
					glass: res.body.glass,
					imageUrl: res.body.imageUrl,
					ingredients: res.body.ingredients
				});
				d.save().then(() => console.log(res.body.name, "saved"))
			}
		})
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})