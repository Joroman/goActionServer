var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
//node module for authentication
var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//config file define de mongoDB url to conncet and a secret-key
var config      = require('./config.js');
//server
var app         = express();
//routes
var actionsales = require('./routes/actionsRouter');
var clients     = require('./routes/clientsRouter');
var sales       = require('./routes/salesRouter');
// User is the model I make use to track my users Supporting registration new user login users
var users       = require('./routes/usersRouter');

//++++++ MONGODB CONNECT BY MOONGOSE
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected to the MongoDB');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//passport Strategy for authentication
// passport config
var User = require('./models/userSchema');
//inicialize passport
app.use(passport.initialize());
//passport set up Strategy use
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);
app.use('/actions', actionsales);
app.use('/clients', clients);
app.use('/sales', sales);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
