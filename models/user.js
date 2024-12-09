const mongoose = require('mongoose');
const joi = require('joi');
  
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 255
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255
  },
  middleInitial: {
    type: String,
    maxlength: 2
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Others']
  },
  birthDate: {
    type: Date,
    required: true
  },
  schoolName:{
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  yearLevel: {
    type: String,
    required: true,
    maxlength: 50 
  },
  course: {
    type: String,
    required: true,
    maxlength: 255
  },
  emailAddress: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    unique: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  }
});

// Validating user registration before transfering data to the db
function validateUser(user) {
  const schema = joi.object({
    firstName: joi.string().max(255).required(),
    lastName: joi.string().max(255).required(),
    middleInitial: joi.string().min(1).max(2),
    age: joi.number().required(),
    gender: joi.string().valid('Male', 'Female', 'Others').required(),
    birthDate: joi.date().less('now').required(),
    schoolName: joi.string().min(8).max(255).required(),
    yearLevel: joi.string().max(50).required(),
    course: joi.string().max(255).required(),
    emailAddress: joi.string().email().min(8).max(255).required(),
    username: joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9_]{3,255}$'))
      .required(),
    password: joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{8,255}$'))
      .required()

  })

  return schema.validate(user);
}

const User = mongoose.model('User', userSchema);

module.exports.validate = validateUser;
module.exports.User = User;