// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import BuffWheel from './components/BuffWheel';
import DebuffWheel from './components/DebuffWheel';
import * as XLSX from 'xlsx';
import CuteMonster from './CuteMonster'; // Import CuteMonster component
import Modal from './Modal'; // Import the Modal component

const App = () => {
  const [bossHealth, setBossHealth] = useState(100);
  const [classHealth, setClassHealth] = useState(100);
  const [showBuffWheel, setShowBuffWheel] = useState(false);
  const [showDebuffWheel, setShowDebuffWheel] = useState(false);
  const [damageMultiplier, setDamageMultiplier] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [endMessage, setEndMessage] = useState(null); // State for end game message

  const handleMonsterSelect = () => {
    const monsterImages = [
      'monster1.png',
      'monster2.png',
      'cute-monster.jpg',
      'monster4.png',
      'monster5.png'
    ];
    const randomMonster = monsterImages[Math.floor(Math.random() * monsterImages.length)];
    setSelectedMonster(randomMonster);
  };

  const handleCorrect = () => {
    setShowBuffWheel(true);
  };

  const handleIncorrect = () => {
    setShowDebuffWheel(true);
  };

  const applyBuff = (buff) => {
    setShowBuffWheel(false);
  
  // Log the current health before applying the buff
  console.log('Boss Health before buff:', bossHealth);
  console.log('Class Health before buff:', classHealth);

  // Apply the buff
  if (buff.multiplier) {
    // Apply multiplier buff
    const baseDamage = 10;
    const damage = baseDamage * buff.multiplier;
    setBossHealth((prevHealth) => Math.max(prevHealth - damage, 0));
  } else if (buff.extraDamage) {
    // Apply extra damage buff
    const damage = buff.extraDamage;
    setBossHealth((prevHealth) => Math.max(prevHealth - damage, 0));
  } else if (buff.heal) {
    // Apply heal buff
    setClassHealth((prevHealth) => Math.min(prevHealth + buff.heal, 100)); // Assuming max class health is 100
    setBossHealth((prevHealth) => Math.max(prevHealth - 10, 0));
  }
}

  const applyDebuff = (debuff) => {
    setShowDebuffWheel(false);
    // Apply the debuff
  if (debuff.damage) {
    // Apply damage debuff
    const damage = debuff.damage;
    setClassHealth((prevHealth) => Math.max(prevHealth - damage, 0));

  } else if (debuff.healBoss) {
    // Apply boss heal debuff
    setBossHealth((prevHealth) => Math.min(prevHealth + debuff.healBoss, 100)); // Assuming max boss health is 100
    setClassHealth((prevHealth) => Math.max(prevHealth - 10, 0));
  }
  };

  const handleRestart = () => {
    setBossHealth(100);
    setClassHealth(100);
    setDamageMultiplier(1);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedMonster(null);
    setEndMessage(null); // Reset the end game message
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setQuestions(json);
      setCurrentQuestionIndex(0);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  useEffect(() => {
    if (classHealth === 0) {
      setEndMessage('You lost');
    } else if (bossHealth === 0) {
      setEndMessage('You win');
    }
  }, [classHealth, bossHealth]);

  return (
    <div className="App">
      <div className="top-left">
        <button className="restart-button" onClick={handleRestart}>Restart</button>
      </div>
      <div className="top-right">
        <button className="monster-button" onClick={handleMonsterSelect}>Monster</button>
      </div>
      <div className="top-right-upload">
        <input
          type="file"
          accept=".xlsx, .xls"
          className="upload-button"
          onChange={handleFileUpload}
        />
      </div>
      <div className="buttons-top">
        <button className="action-button correct" onClick={handleCorrect}>Correct</button>
        <button className="action-button incorrect" onClick={handleIncorrect}>Incorrect</button>
      </div>
      <div className="health-bars">
        <div className="health-bar-container">
          <p className="health-title">Class Health</p>
          <div className="health-bar-border">
            <div className="health-bar class-health">
              <div className="health-progress" style={{ width: `${classHealth}%` }}></div>
            </div>
          </div>
        </div>
        <div className="health-bar-container">
          <p className="health-title">Boss Health</p>
          <div className="health-bar-border">
            <div className="health-bar boss-health">
              <div className="health-progress" style={{ width: `${bossHealth}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      {selectedMonster && (
        <div className="monster">
          <img src={`/monsters/${selectedMonster}`} alt="Monster" />
        </div>
      )}
      {questions.length > 0 && (
        <div className="question-buttons">
          <button className="question-button" onClick={handleNextQuestion}>Next Question</button>
          <button className="question-button" onClick={handleRandomQuestion}>Random Question</button>
        </div>
      )}
      {questions.length > 0 && (
        <div className="question-display">
          <p>{questions[currentQuestionIndex]}</p>
        </div>
      )}
      {showBuffWheel && <BuffWheel applyBuff={applyBuff} />}
      {showDebuffWheel && <DebuffWheel applyDebuff={applyDebuff} />}
      {endMessage && <Modal message={endMessage} onRestart={handleRestart} />}
      {/*<CuteMonster position="bottom-left" /> {/* Place CuteMonster in the bottom-left corner */}
      {/*<CuteMonster position="bottom-right" /> {/* Place CuteMonster in the bottom-right corner */}
    </div>
  );
};

export default App;
