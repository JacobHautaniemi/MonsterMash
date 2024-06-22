import React from 'react';
import './QuestionDisplay.css';

function QuestionDisplay({ question }) {
  return (
    <div className="question-display">
      {question}
    </div>
  );
}

export default QuestionDisplay;
