var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var poemSchema = mongoose.Schema({
    title: String,
    author: String
});

module.exports = mongoose.model('Poem', poemSchema); //allow Poem to be access from poemconoller.js