import React from 'react';
import './ActionButtons.css';

function ActionButtons({ onAnswer }) {
  return (
    <div className="action-buttons">
      <button onClick={() => onAnswer(true)}>Correct</button>
      <button onClick={() => onAnswer(false)}>Incorrect</button>
    </div>
  );
}

export default ActionButtons;
