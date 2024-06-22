import React from 'react';
import './MonsterDisplay.css';

function MonsterDisplay({ monster }) {
  return (
    <div className="monster-display">
      <img src={monster.imageUrl} alt={monster.name} />
      <div>{monster.name}</div>
    </div>
  );
}

export default MonsterDisplay;
