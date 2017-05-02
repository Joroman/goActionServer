// get an instance of mongoose and mongoose.Schema
//user model to track user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose support pluging for passport make more easy to mange users
var passportLocalMongoose = require('passport-local-mongoose');
// When user was creaeterd the admin type by default will be false
// i could expand my User Schema in order to create a profile (ex. last name, age...)
var User = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
        default: false
    }
});

// here I saying to my User Schema that use the passportLocalMongoose pluguin
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
