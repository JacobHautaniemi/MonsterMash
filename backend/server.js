const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let questions = []; // In-memory database to store questions

// Routes
app.get('/questions', (req, res) => {
  res.json(questions);
});

app.post('/questions', (req, res) => {
  const newQuestion = req.body;
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const updatedQuestion = req.body;

  let questionIndex = questions.findIndex(question => question.id === id);
  if (questionIndex !== -1) {
    questions[questionIndex] = updatedQuestion;
    res.json(updatedQuestion);
  } else {
    res.status(404).json({ message: 'Question not found' });
  }
});

app.delete('/questions/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = questions.length;

  questions = questions.filter(question => question.id !== id);
  if (questions.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Question not found' });
  }
});

const PORT = process.env.PORT || 3002; // Changed port to 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
