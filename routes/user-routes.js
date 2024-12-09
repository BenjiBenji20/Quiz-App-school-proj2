var express = require('express');
var router = express.Router();
const {User, validate} = require('../models/user');
const { Quiz } = require('../models/quiz-data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// declare para walang error tang ina ewan ko ba
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

// Rendering register page for vieww
router.get('/register-page', function(req, res, next) {
  res.render('register-page', { 
    type: typeOptions, 
    difficulty: difficultyOptions,
    error: null,
    errorMessage: null,
    successfulMessage: null
   });
});


// Registration routes
router.post('/register', async(req, res) => {
  const { error } = validate(req.body);
  if(error) {
    // If invalid user registration, then the user will go back to the register page again.
    return res.render('register-page', {
      type: typeOptions, 
      difficulty: difficultyOptions,
      error: error.details,
      errorMessage: null,
      successfulMessage: null
    });
  } 

  // Validate if the user is already existed
  const isUserExist = await User.findOne({
    $or: [
      { emailAddress: req.body.emailAddress },
      { username: req.body.username }
    ]
  });

  if(isUserExist) {
    return res.render('register-page', {
      type: typeOptions, 
      difficulty: difficultyOptions,
      error: null,
      errorMessage: 'User already exists. Please try again.',
      successfulMessage: null
    });
  }
  else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // extracting passed obj to a variable with security
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleInitial: req.body.middleInitial,
        age: req.body.age,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        schoolName: req.body.schoolName,
        yearLevel: req.body.yearLevel,
        course: req.body.course,
        emailAddress: req.body.emailAddress,
        username: req.body.username,
        password: hashedPassword
      });

      await user.save(); // save to pass to the db
      return res.render('start-game', {
        type: typeOptions, 
        difficulty: difficultyOptions,
        error: null,
        errorMessage: null,
        successfulMessage: 'Registration successful!'
      })
    } 
    catch (error) {
      console.error('An error occurred while processing your registration. Please try again later.', error);

      return res.render('register-page', {
        type: typeOptions, 
        difficulty: difficultyOptions,
        error: null,
        errorMessage: 'An error occurred while processing your registration. Please try again later.',
        successfulMessage: null
      });
    }
  }
});


// User login routes
router.post('/user-auth', async(req, res) => {
  const {username, password} = req.body;

  try {
    // check if the user credentials are existing in db
    const user = await User.findOne({ username });
    console.log('User:', user.username);
    console.log('User hashedPassword:', user.password);
    if(!user) {
      console.log('Locate: /user-auth/try/if-statement');
      console.log('User not found');
      return res.render('start-game', {
        type: typeOptions, 
        difficulty: difficultyOptions,
        errorMessage: 'Invalid username or password'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
      return res.render('start-game', {
        type: typeOptions, 
        difficulty: difficultyOptions,
        errorMessage: 'Invalid username or password'
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '24 hour'
    });

    // Store token in a secure HTTP-only cookie
     res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      maxAge: 24 * 60 * 60 * 1000, // 1 hour
    });

    // Redirect to the page
    return res.redirect('user-profile');
  } 
  catch (error) {
    console.error('Server error.', error);
    return res.render('start-game', {
      type: typeOptions, 
      difficulty: difficultyOptions,
      type: typeOptions, 
      difficulty: difficultyOptions,
      errorMessage: 'Something went wrong. Please try again.'
    });
  }
});


// middleware to verify jwt
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    req.isGuest = true;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodedToken.userId;
    res.locals.userId = req.userId;
    next();
  } catch (error) {
    res.clearCookie('authToken');
    return res.redirect('/start-game');
  }
};


// security to prevent back when already loggedout
const noCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '-1');
  next();
};


// GET profile page and display user data
router.get('/user-profile', noCache, authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // fetch user data using id

    // Convert req.userId to ObjectId explicitly
    const userObjectId = new mongoose.Types.ObjectId(req.userId);
    const quizData = await Quiz.find({userId: userObjectId}); // fetch quiz data with reference to the user using its id

    // Extract both all users and quiz data from db for leaderboard display
    const DBUsers = await User.find();
    const quiz = await Quiz.find().populate('userId', 'firstName lastName username course');
    // sort the quiz data
    const DBQuizzes = quiz.sort((a, b) => b.totalScore - a.totalScore);
    
    // if not found or cannot fetch
    if(!user) {
      return res.redirect('start-game');
    }

    // render user-profile with data
    res.render('user-profile', {
      type: typeOptions, 
      difficulty: difficultyOptions,
      user,
      quizData,
      DBUsers,
      DBQuizzes
    });
  } 
  catch (error) {
    console.error('Error fetching data', error);
    res.redirect('start-game');
  }
});


// Logout route
router.get('/logout', (req, res) => {
  // clear auth cookie
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  // redirect to the start game page
  res.redirect('start-game');
});


module.exports = router;