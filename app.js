var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Auth = require('./routes/auth');

var isProduction = process.env.PRODUCTION ? process.env.PRODUCTION: 'production';
process.env.UV_THREADPOOL_SIZE = 20;
var app = express();
app.use(cors());

// view engine setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'znyak',
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', Auth);

if (isProduction === 'production') {
  mongoose.connect('mongodb://localhost:27017/subAdminPanel')
}

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
