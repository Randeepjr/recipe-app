import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';  // Import RecipeContext

const Home = () => {
  const { recipes } = useContext(RecipeContext);  // Get the list of recipes from context
  const navigate = useNavigate();

  console.log('Recipes:', recipes);  // Log all recipes to verify IDs

  // Function to navigate to the submission page
  const navigateToSubmission = () => {
    navigate('/submit');
  };

  return (
    <div className="screen">
      <h1>Welcome to the Recipe App</h1>

      <button onClick={navigateToSubmission}>Submit a Recipe</button> {/* Button to navigate to submission */}

      <h2>All Submitted Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes submitted yet!</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <Link to={`/recipe/${recipe._id}`}>{recipe.dishName}</Link>  {/* Link to recipe details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;