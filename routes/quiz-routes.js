const express = require('express');
const router = express.Router();
const QuizData = require('../models/quiz-data');
const { User } = require('../models/user');
const {authenticateToken} = require('./user-routes');


// Route for saving quiz scores
router.post('/', authenticateToken, async (req, res) => {
  const { score, difficulty, questionType, quizItem, totalScore, totalGamePlay } = req.body;
  const userId = req.userId; // From the authenticateToken middleware

  try {
    // Save quiz data to the quiz-data collection
    const newQuiz = new QuizData({
      userId,
      score,
      difficulty,
      questionType,
      date: new Date(),
      quizItem: quizItem || [], // Default to an empty array if not provided
      totalScore: totalScore || 0, // Default to 0 if not provided
      totalGamePlay: totalGamePlay || 0, // Default to 0 if not provided
    });

    await newQuiz.save();

    res.status(200).json({ message: 'Score saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving quiz score', error });
  }
});


module.exports = router;