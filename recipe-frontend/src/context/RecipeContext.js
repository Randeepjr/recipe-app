import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Create the context to store the recipes
export const RecipeContext = createContext();

// Create a provider component to manage the recipes
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  // Function to fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/recipes');  // Replace with your backend URL
      setRecipes(response.data); // Assuming the data from backend is an array of recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Fetch recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to add a new recipe
  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:5001/api/recipes', newRecipe);  // Replace with your backend URL
      setRecipes([...recipes, response.data]); // Update state with the new recipe from the backend
      console.log('New Recipe Added:', response.data);  // Debug log to check if recipe is added
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};