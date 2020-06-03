var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var refreshTokenRouter= require('./routes/refreshToken');
require('dotenv').config();
var app = express();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mongooes', {useNewUrlParser: true,  useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: true})
// .then(() => console.log('DB Connected!'))
// .catch(err => {
// console.log(Error, err.message);
// })

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thang:thang@cluster0-q8vge.mongodb.net/scrum?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(Error, err.message);
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/refresh-token', refreshTokenRouter);

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
