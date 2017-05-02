var User = require('../models/userSchema');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');
//create generate json web tocken
exports.getToken = function (user) {
  //generate the sign token
  //config.secretKey is from my config.js that I generate
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};
//verify json web token
//validate the token so validate if its an autheticate user
exports.verifyOrdinaryUser = function (req, res, next) {
    //retrieve the token of one of these three posibilities
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    //if token its not null
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
