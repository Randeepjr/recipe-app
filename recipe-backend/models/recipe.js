const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  prepTime: {
    type: Number,
    required: true,
    max: 180,
  },
  calorieCount: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
    maxlength: 500,
  },
  method: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  spiceLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;