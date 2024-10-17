const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;  // Backend will run on this port

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse incoming JSON

// MongoDB connection (Replace <username>, <password>, and <dbname> with your credentials)
mongoose.connect('mongodb+srv://randeepjr:1234567890@cluster0.boyrw.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0', {});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Recipe Schema for MongoDB
const recipeSchema = new mongoose.Schema({
  dishName: String,
  prepTime: Number,
  calorieCount: Number,
  ingredients: String,
  method: String,
  spiceLevel: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);  // Create a Recipe model

// Routes
// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// Add a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe' });
  }
});

// Get a single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});