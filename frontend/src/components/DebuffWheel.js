import React, { useEffect, useState } from 'react';

// Define your list of possible debuffs here
const debuffs = [
  { name: 'Extra Damage', damage: 20},
  { name: 'Blind Mode', damage: 10},
  { name: 'Boss Heal', healBoss: 20},
  { name: 'Double Damage', damage: 20},
  { name: 'Less time to answer', damage: 10},
  { name: 'No debuff', damage: 10},
  { name: 'No debuff', damage: 10},
  { name: 'No debuff', damage: 10},
  // Add more debuffs as needed
];

const DebuffWheel = ({ applyDebuff }) => {
  const [selectedDebuff, setSelectedDebuff] = useState(null);

  useEffect(() => {
    const cycleDuration = 2000; // Duration of cycling animation in milliseconds
    const freezeDuration = 2000; // Duration to freeze on the chosen option after cycling in milliseconds
    const interval = 100; // Interval between changes in milliseconds
    const animationDebuffs = debuffs.concat(debuffs); // Double the debuffs for continuous scrolling

    let currentIndex = 0;

    const animationInterval = setInterval(() => {
      setSelectedDebuff(animationDebuffs[currentIndex]);
      currentIndex++;

      // If reached end of debuffs array, reset to start
      if (currentIndex === animationDebuffs.length) {
        currentIndex = 0;
      }
    }, interval);

    // Stop animation and choose a random debuff after the cycle duration
    setTimeout(() => {
      clearInterval(animationInterval);
      const chosenDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];
      setSelectedDebuff(chosenDebuff);

      // Freeze on the chosen option for the specified duration
      setTimeout(() => {
        applyDebuff(chosenDebuff);
      }, freezeDuration);
    }, cycleDuration);

    // Clear interval on unmount
    return () => clearInterval(animationInterval);
  }, [applyDebuff]);

  return (
    <div className="wheel-overlay">
      <div className="wheel">
        {selectedDebuff ? (
          <div>{selectedDebuff.name}</div>
        ) : (
          <div>Spinning for Debuff...</div>
        )}
      </div>
    </div>
  );
};

export default DebuffWheel;
