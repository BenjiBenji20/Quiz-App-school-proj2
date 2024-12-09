const express = require('express');
const router = express.Router();
const { Quiz } = require('../models/quiz-data');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeOptions = [
  { value: '', name: 'Click to Select' },
  { value: 'multiple', name: 'Multiple Choice' },
  { value: 'boolean', name: 'True or False' }
];

const difficultyOptions = [
  { value: '', name: 'Click to Select' },
  { value: 'easy', name: 'Easy' },
  { value: 'medium', name: 'Medium' },
  { value: 'hard', name: 'Hard' }
];

router.get('/', (req, res) => {
  res.send('Evaluate Quiz Route Working');
});

router.post('/', async (req, res) => {
  const userAnswers = [];
  const correctAnswers = [];
  const questions = [];

  let score = 0;
  let difficulty = req.body.difficulty;
  let type = req.body.type;

  try { 
    // Loop through the questions and compare user answers to correct answers
    Object.keys(req.body).forEach((key) => {
      if (key.startsWith('option_')) {
        let index = key.split('_')[1]; // Get the question index
        let userAnswer = req.body[key];
        let correctAnswer = req.body[`correct_answer_${index}`];
        let questionText = req.body[`question_${index}`]; // Get the question text from the body

        userAnswers.push(userAnswer);
        correctAnswers.push(correctAnswer);
        questions.push(questionText);

        // Condition for counting scores
        if (difficulty === 'hard') {
          if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            score++; 
          }
        } else {
          if (userAnswer === correctAnswer) {
            score++; 
          }
        }
      }
    });

    console.log('User Score: ', score); // For debugging purposes

    const numberOfQuestions = correctAnswers.length;

    const results = userAnswers.map((answer, index) => ({
      question: questions[index],
      userAnswer: answer,
      correctAnswer: correctAnswers[index],
    }));

    // if user is authenticated then saved quiz results to the db
    const token = req.cookies.authToken;
    if(token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;

        const existingQuizData = await Quiz.findOne({ userId });

        // initial data
        let totalScore = score; 
        let totalQuizTake = 1; 

        if (existingQuizData) {
          // If the user already has a quiz record, increment the totals
          totalScore = existingQuizData.totalScore + score;
          totalQuizTake = existingQuizData.totalQuizTake + 1;
        }

        // save quiz results to the db
        const quizData = {
          userId,
          score,
          questionType: type,
          difficulty: difficulty,
          date: new Date(),
          quizItem: numberOfQuestions,
          totalScore, // This is updated with the current score + previous total
          totalQuizTake, // Incremented by 1 for each new quiz
        }

         // Save the quiz result to the database
        if (existingQuizData) {
          await Quiz.findOneAndUpdate({ userId }, quizData, { new: true });
          console.log('Quiz result updated in database.');
        } else {
          // Create a new quiz record if none exists
          const quizResult = new Quiz(quizData);
          await quizResult.save();
          console.log('New quiz result saved to database.');
        }
      } 
      catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    // Render the view with the results
    res.render('result-page', { 
      score, 
      type: typeOptions, 
      difficulty: difficultyOptions, 
      numberOfQuestions, 
      results, 
      totalQuestions: numberOfQuestions 
    });
  }
  catch (error) {
    console.error('Error retrieving data from OpenTDB:', error);
    res.status(500).send('Error retrieving data from OpenTDB');
  }
});

module.exports = router;
