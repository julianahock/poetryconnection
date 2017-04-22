var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    screenName: {type: String, unique: true}, //This Mongo feature will enforce that screenName is unique and declare as a string
    email: {type: String, unique: true}
});

mongoose.model('Users', usersSchema); //allow User to be accessed from api.js
