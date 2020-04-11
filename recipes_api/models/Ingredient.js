const mongoose = require('mongoose');


const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "other"
    },
    available: {
        type: Boolean,
        default: false
    }
});

mongoose.model("Ingredient", IngredientSchema);


module.exports = mongoose.model('Ingredient');