import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';  // Import RecipeContext

const RecipeDetail = () => {
  const { id } = useParams();  // Get the recipe ID from the URL
  const { recipes } = useContext(RecipeContext);  // Get the list of recipes from context

  console.log('Recipe ID from URL:', id);
  console.log('Recipes in context:', recipes);

  const recipe = recipes.find((recipe) => recipe._id === id);  // Find the recipe by ID
  const navigate = useNavigate();

  console.log('Found Recipe:', recipe);  // Log the found recipe or failure

  if (!recipe) {
    return <div>Recipe not found!</div>;  // Handle if recipe not found
  }

  return (
    <div>
        <h1>{recipe.dishName}</h1>
        <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
        <p><strong>Calorie Count:</strong> {recipe.calorieCount}</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
        <p><strong>Method:</strong> {recipe.method}</p>
        <p><strong>Spice Level:</strong> Level {recipe.spiceLevel}</p>
    
        <button onClick={() => navigate('/')} className="back-button">BACK</button> {/* Add Back button */}
    </div>
  );
};

export default RecipeDetail;