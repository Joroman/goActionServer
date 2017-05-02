var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userSchema');
//Verify encapsulate all in order to manage json web tooken
//verify users identity
var Verify    = require('./verify');

// manage users register and logout
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//register new user post /user/register new user registretion
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

router.post('/login', function(req, res, next) {
  //cheeking if users login was succeasful or not
  passport.authenticate('local', function(err, user, info) {
    //if err return
    if (err) {
      return next(err);
    }
    //if user is valid user inform that password are wrong
    //if user is not null paasport callback retrive a user
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    //if erro go out. Check the user and password and return an error if it's not correct
    //passport suport the req.login() function to balidate user authentication
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      //generet de tocken for the user
      //I have to generate my own verify.js in the routes folder
      var token = Verify.getToken(user);
      // send the ok response and the token for the client
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});
router.get('/logout', function(req, res) {
//passport support req.logout() function and destroy the token
    req.logout();
    res.status(200).json({
    status: 'Bye!'
  });
});
module.exports = router;
