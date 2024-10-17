import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Home page
import RecipeSubmission from './components/RecipeSubmission'; // Recipe submission page
import RecipeDetail from './components/RecipeDetail'; // Recipe details page
import { RecipeProvider } from './context/RecipeContext';  // Import the RecipeProvider
import Confirmation from './components/Confirmation';  // Import the confirmation page

console.log(Home, RecipeSubmission, RecipeDetail);

const App = () => {
  return (
    <RecipeProvider>  {/* Wrap the whole app in RecipeProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/submit" element={<RecipeSubmission />} /> {/* Submission page */}
            <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Recipe details */}
            <Route path="/confirmation" element={<Confirmation />} />  {/* Confirmation Page */}
          </Routes>
        </div>
      </Router>
    </RecipeProvider>
  );
};

export default App;