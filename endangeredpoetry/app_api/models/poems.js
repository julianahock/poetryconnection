var mongoose = require('mongoose');

var poemsSchema = mongoose.Schema({
    title: String,
    author: String,
    poemBody: String
});

mongoose.model('Poems', poemsSchema); //allow Poem to be accessed from api.js
