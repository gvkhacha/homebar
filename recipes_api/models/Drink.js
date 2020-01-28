const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const IngrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const DrinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: String, //url
    ingredients: [IngrSchema],
    steps: [String],
    glassware: String
})

DrinkSchema.plugin(uniqueValidator);
// uniqueValidator uses a deprecated mongoose method. For now, good enough solution.
mongoose.model('Drink', DrinkSchema);

module.exports = mongoose.model('Drink');