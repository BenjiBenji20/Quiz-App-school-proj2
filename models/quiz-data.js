const mongoose = require('mongoose');
const Joi = require('joi');
 
const quizSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  questionType: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  quizItem: {
    type: Number,
    required: true,
    min: 1
  },
  totalScore: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuizTake: {
    type: Number,
    required: true,
    min: 0
  }
},
  {timestamps: true} // automatically track createdAt and updatedAt
);

// validation for quiz data
function validateQuiz(quiz) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    score: Joi.number().min(0).required(),
    questionType: Joi.string.required(),
    difficulty: Joi.string.required(),
    date: Joi.date().required(),
    quizItem: Joi.number().min(1).required(),
    totalScore: Joi.number().min(0).required(),
    totalQuizTake: Joi.number().min(0).required()
  });

  return schema.validate(quiz);
} 

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports.validate = validateQuiz;
module.exports.Quiz = Quiz;