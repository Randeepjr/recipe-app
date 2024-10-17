import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="screen">
      <h1>Recipe Submitted!</h1>
      <p>Your recipe has been submitted successfully.</p>
      <button onClick={navigateHome}>Return Home</button>
    </div>
  );
};

export default Confirmation;