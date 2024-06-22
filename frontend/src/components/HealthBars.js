import React from 'react';
import './HealthBars.css';

function HealthBars({ classHealth, bossHealth }) {
  return (
    <div className="health-bars">
      <div className="health-bar">
        <div className="label">Class Health</div>
        <div className="bar" style={{ width: `${classHealth}%`, backgroundColor: 'green' }}></div>
      </div>
      <div className="health-bar">
        <div className="label">Boss Health</div>
        <div className="bar" style={{ width: `${bossHealth}%`, backgroundColor: 'red' }}></div>
      </div>
    </div>
  );
}

export default HealthBars;
