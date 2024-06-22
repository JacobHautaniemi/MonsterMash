// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ message, onRestart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>{message}</h1>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
};

export default Modal;
