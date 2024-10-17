const express = require('express');
const Recipe = require('../models/recipe'); // Import the Recipe model
const router = express.Router();

// Route to get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new recipe
router.post('/recipes', async (req, res) => {
  const recipe = new Recipe({
    dishName: req.body.dishName,
    prepTime: req.body.prepTime,
    calorieCount: req.body.calorieCount,
    ingredients: req.body.ingredients,
    method: req.body.method,
    spiceLevel: req.body.spiceLevel,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;