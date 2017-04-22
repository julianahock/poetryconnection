var mongoose = require('mongoose');

//https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1 -- We are doing one to many vs. one to few because a poem can have an unlimited number of reviews. One to few works good for a person having just a few addresses or a few phone numbers

var reviewsSchema = mongoose.Schema({
    reviewBody: String,
    score: Number,
    _poem: { type: mongoose.Schema.Types.ObjectId, ref: 'Poem' },         //A review references (aka "refs") a specific Poem. See http://mongoosejs.com/docs/populate.html Underscore prefix seems to be a mongo standard convention for references
    _reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }      //A review references a specific User
});

 mongoose.model('Reviews', reviewsSchema); //allow Review to be accessed from api.js
