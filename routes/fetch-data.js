var express = require('express');
var router = express.Router();
const axios = require('axios');
const he = require('he'); // For decoding nonASCII characters
const jwt = require('jsonwebtoken'); // to track if the token is available
require('dotenv').config();
const authenticateToken  = require('./user-routes');

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

router.use(authenticateToken);

router.get('/', function(req, res, next) {
  res.render('start-game', { 
    type: typeOptions, 
    difficulty: difficultyOptions, 
    isGuest: req.isGuest
  });
});
 

router.post('/', async (req, res) => {
  const { type, difficulty } = req.body;

  // check if the user is authenticated by verifying the toekn
  let isGuest = true;
  const token = req.cookies.authToken;
  if(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if(decodedToken && decodedToken.userId) {
        isGuest = false; // user is authenticated
      }
    } 
    catch (error) {
      console.error('Error token.', error);
    }
  }

  try {
    const amount = (difficulty === 'hard' && type === 'boolean') ? 2 : 10;  // to avoid 0 results when difficulty=hard & type=boolean
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=17&difficulty=${difficulty}&type=${type}`);
    const results = response.data.results;

    // Decode each results using 'he.decode()'
    const cleanResults = results.map((questionObj) => {
      return {
        ...questionObj, // Spread the original question object
        question: he.decode(questionObj.question), 
        correct_answer: he.decode(questionObj.correct_answer), 
        incorrect_answers: questionObj.incorrect_answers.map((answer) => he.decode(answer))
      };
    });

    res.render('quiz-page', { type: typeOptions, 
      difficulty: difficulty, 
      results: cleanResults,
      isGuest
    });
  } 
  catch (error) {
    console.error('Error retrieving data from OpenTDB:', error);
    res.status(500).send('Error retrieving data from OpenTDB');
  }
});


module.exports = router;