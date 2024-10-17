import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';  // Import the RecipeContext
import './RecipeSubmission.css';

const RecipeSubmission = () => {
  const [dishName, setDishName] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [calorieCount, setCalorieCount] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [errors, setErrors] = useState({});
  
  const { addRecipe } = useContext(RecipeContext);  // Get the addRecipe function from RecipeContext
  console.log(RecipeContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
   
    // Initialize an empty object to store errors
    const newErrors = {};

    // Validation checks
    if (dishName.length > 50) {
      newErrors.dishName = 'Name of the dish cannot exceed 50 characters.';
    }

    if (prepTime > 180 || isNaN(prepTime) || /\s/.test(prepTime)) {
      newErrors.prepTime = 'Preparation time must be a number and less than or equal to 180 minutes.';
    }

    if (isNaN(calorieCount) || /\s/.test(calorieCount)) {
      newErrors.calorieCount = 'Calorie count must be a valid number with no spaces.';
    }

    if (ingredients.length > 500) {
      newErrors.ingredients = 'Ingredients cannot exceed 500 characters.';
    }

    if (method.length > 2000) {
      newErrors.method = 'Method cannot exceed 2000 characters.';
    }

    // If there are any errors, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed to add recipe and navigate to home
    setErrors({});  // Clear errors if all validations pass

    // Create a new recipe object
    const newRecipe = {
      id: Date.now(),  // Unique ID for each recipe
      dishName,
      prepTime,
      calorieCount,
      ingredients,
      method,
      spiceLevel
    };

    console.log(newRecipe.id, typeof newRecipe.id);  // Log id and its type

    // Debug log to ensure addRecipe is being called
  console.log('Submitting new recipe:', newRecipe);
    
    // Add the new recipe to the global list
    addRecipe(newRecipe);

    // Redirect to the home page after submission
    navigate('/confirmation');
  };

  return (
    <div className="form-container">
      <h1>Submit Your Recipe</h1>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>NAME OF THE DISH</label>
          <input 
            type="text" 
            value={dishName} 
            onChange={(e) => setDishName(e.target.value)} 
            maxLength="50" 
            required 
            className="form-input"
          />
          {errors.dishName && <p className="error-message">{errors.dishName}</p>}
        </div>
        
        <hr />

        <div className="form-group">
          <label>PREPARATION TIME</label>
          <input 
            type="text" 
            value={prepTime} 
            onChange={(e) => setPrepTime(e.target.value)} 
            required 
            className="form-input"
          />
          {errors.prepTime && <p className="error-message">{errors.prepTime}</p>}
          <p className="subtext">Enter time in minutes (numbers only).</p>
        </div>

        <hr />

        <div className="form-group spice-group">
          <label>SPICE LEVEL</label>
          <div className="spice-level">
            <label><input type="radio" value="1" name="spiceLevel" onChange={(e) => setSpiceLevel(e.target.value)} required /> LEVEL 1</label>
            <label><input type="radio" value="2" name="spiceLevel" onChange={(e) => setSpiceLevel(e.target.value)} /> LEVEL 2</label>
            <label><input type="radio" value="3" name="spiceLevel" onChange={(e) => setSpiceLevel(e.target.value)} /> LEVEL 3</label>
            <label><input type="radio" value="4" name="spiceLevel" onChange={(e) => setSpiceLevel(e.target.value)} /> LEVEL 4</label>
            <label><input type="radio" value="5" name="spiceLevel" onChange={(e) => setSpiceLevel(e.target.value)} /> LEVEL 5</label>
          </div>
        </div>

        <hr />

        <div className="form-group">
          <label>CALORIE COUNT</label>
          <input 
            type="text" 
            value={calorieCount} 
            onChange={(e) => setCalorieCount(e.target.value)} 
            required 
            className="form-input"
          />
          {errors.calorieCount && <p className="error-message">{errors.calorieCount}</p>}
        </div>

        <hr />

        <div className="form-group">
          <label>INGREDIENTS</label>
          <input 
            type="text" 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
            maxLength="500" 
            required 
            className="form-input"
          />
          {errors.ingredients && <p className="error-message">{errors.ingredients}</p>}
        </div>

        <hr />

        <div className="form-group">
          <label>METHOD</label>
          <textarea 
            value={method} 
            onChange={(e) => setMethod(e.target.value)} 
            maxLength="2000" 
            required 
            className="form-input"
          />
          {errors.method && <p className="error-message">{errors.method}</p>}
        </div>

        <hr />

        <button type="submit" className="submit-button">Submit Recipe</button>
      </form>
      <button onClick={() => navigate('/')} className="back-button">BACK</button> {/* Add Back button */}
    </div>
  );
};

export default RecipeSubmission;