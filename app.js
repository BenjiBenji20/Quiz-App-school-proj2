var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const injectUser = require('./routes/user-to-locals');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Static Apps
var historyPageRouter = require('./routes/history-page-routes');
var homepageRouter = require('./routes/home-page-routes');
var aboutUsPageRouter = require('./routes/about-us-page-routes');


// Application projects
var fetchDataRouter = require('./routes/fetch-data');
var evaluateQuizAnswerRouter = require('./routes/evaluate-quiz-answer');
var userRouter = require('./routes/user-routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(injectUser); // Inject user data into all views
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Database Connected'))
  .catch(err => console.error('Connection Error', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Static Apps
app.use('/history-page', historyPageRouter);
app.use('/home-page', homepageRouter);
app.use('/about-us-page', aboutUsPageRouter);


// Application projects
app.use('/fetch-data', fetchDataRouter);
app.use('/start-game', fetchDataRouter); // Handled in fetchDataRouter
app.use('/quiz-page', fetchDataRouter);
app.use('/', userRouter); 


// Evaluation of quiz answers
app.use('/evaluate-quiz-answer', evaluateQuizAnswerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
