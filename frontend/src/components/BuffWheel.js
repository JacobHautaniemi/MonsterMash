import React, { useEffect, useState } from 'react';

// Define your list of possible buffs here
const buffs = [
  { name: 'Double Damage', multiplier: 2 },
  { name: 'Extra 10 Damage', multiplier: 1.5},
  { name: 'Heal Class', heal: 20},
  { name: 'No buff', multiplier: 1},
  { name: 'Choose the next person to answer', multiplier: 1},
  { name: 'Extra 5 Damage', multiplier: 1.25},
  { name: 'Heal class', heal: 20},
  { name: 'No buff', multiplier: 1},
  // Add more buffs as needed
];

const BuffWheel = ({ applyBuff }) => {
  const [selectedBuff, setSelectedBuff] = useState(null);

  useEffect(() => {
    const cycleDuration = 2000; // Duration of cycling animation in milliseconds
    const freezeDuration = 2000; // Duration to freeze on the chosen option after cycling in milliseconds
    const interval = 100; // Interval between changes in milliseconds
    const animationBuffs = buffs.concat(buffs); // Double the buffs for continuous scrolling

    let currentIndex = 0;

    const animationInterval = setInterval(() => {
      setSelectedBuff(animationBuffs[currentIndex]);
      currentIndex++;

      // If reached end of buffs array, reset to start
      if (currentIndex === animationBuffs.length) {
        currentIndex = 0;
      }
    }, interval);

    // Stop animation and choose a random buff after the cycle duration
    setTimeout(() => {
      clearInterval(animationInterval);
      const chosenBuff = buffs[Math.floor(Math.random() * buffs.length)];
      setSelectedBuff(chosenBuff);

      // Freeze on the chosen option for the specified duration
      setTimeout(() => {
        applyBuff(chosenBuff);
      }, freezeDuration);
    }, cycleDuration);

    // Clear interval on unmount
    return () => clearInterval(animationInterval);
  }, [applyBuff]);

  return (
    <div className="wheel-overlay">
      <div className="wheel">
        {selectedBuff ? (
          <div>{selectedBuff.name}</div>
        ) : (
          <div>Spinning for Buff...</div>
        )}
      </div>
    </div>
  );
};

export default BuffWheel;
