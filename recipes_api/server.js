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

app.post('/ingredients/:name', (req, res) => {
	const name = req.params.name;
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Ingredient.find({ name: name })
		.then(result => {
			if (result.length) {
				console.log(name, "already exists");
				res.status(409);
				res.send('Already exists');
			} else {
				var i = new Ingredient({
					supply: false,
					name: name,
					urlName: encodeURIComponent(name)
				});
				i.save().then(() => {
					console.log(name, "saved");
					mongoose.connection.close()
					res.status(200);
					res.send(name);
				})

			}
		})
})

app.delete('/ingredients/:id', (req, res) => {
	const id = req.params.id;
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Ingredient.find({_id: id})
		.deleteOne().exec().then(() => {
			mongoose.connection.close()
			res.status(200);
			res.send('Successfully deleted');
		})
})

app.post('/recipe', (req, res) => {
	mongoose.connect(mongourl, { useNewUrlParser: true })
	Drink.find({ name: req.body.name })
		.then(result => {
			if (result.length) {
				console.log(req.body.name, "already exists");
				mongoose.connection.close()
				res.status(409);
				res.send();
			} else {
				var d = new Drink({
					tags: [],
					oldId: 0,
					instructions: req.body.instructions,
					name: req.body.name,
					glass: req.body.glass,
					imageUrl: req.body.imageUrl,
					ingredients: req.body.ingredients
				});
				d.save().then(() => {
					console.log(req.body.name, "saved");
					mongoose.connection.close()
					res.status(200);
					res.send();
				})
			}
		})
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})