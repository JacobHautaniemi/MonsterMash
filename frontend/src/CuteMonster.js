// CuteMonster.js

import React from 'react';
import './CuteMonster.css';

const CuteMonster = ({ position }) => {
  return (
    <div className={`cute-monster ${position}`}>
      <img src="/monsters/cute-monster.jpg" alt="Cute Monster" />
    </div>
  );
};

export default CuteMonster;
