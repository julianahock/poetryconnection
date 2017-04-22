var mongoose = require('mongoose');
var Reviews = mongoose.model('Reviews');

//Show all reviews from /api/reviews?userId=XXXX&poemId=YYYY http://expressjs.com/en/api.html#req.query
// userId = find all poems where Review._reviewer == userId
// poemId = find all poems where Review._poem == poemId
module.exports.reviewsGetAll = function(req, res) {

  console.log('Read All Reviews');

  //https://docs.mongodb.com/manual/reference/method/db.collection.find/
  var findParameters={};
  var _poem=req.query.poemId;
  if (_poem!=null && _poem.length>0)
      findParameters._poem=_poem;        
  var _reviewer = req.query.userId;
  if (_reviewer!=null && _reviewer.length>0)
      findParameters._reviewer=_reviewer;        
  Reviews
    .find(findParameters)    //exec tells to execute query 
    .exec(function(err, reviews) {    //reviews is the return data
      console.log("Found Reviews", reviews.length);
      //console.log(reviews);
      res
        .json(reviews);  // creates json response with the data 
    });

};


module.exports.reviewsGetOne = function(req, res) {
  console.log('Read one reviews');
  var id = req.params.reviewId;
  console.log('req.params ', req.params);
  console.log('GET reviewId', id);

  Reviews
    .findById(id)
    .exec(function(err, doc) {
      if (err) {
        console.log("can't get reviews", id);
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(200)
          .json(doc);
      }  
    });

};


// Create a new review record from /api/review url
// reviewBody - text for the review 
// score - an integer score from 0 to 5
// userId - the mongo id for the reviewer's User record
// poemId - the mongo id for the poem's Poem record
module.exports.reviewsAddOne = function(req, res) {
  console.log("POST new reviews");

  console.log('req params body' , req.params, req.body);

  Reviews
    .create({
        reviewBody : req.body.reviewBody,
        score : req.body.score,
        _poem : req.body.poemId,
        _reviewer : req.body.userId
     
    }, function(err, reviews) {
      if (err) {
        console.log("can't create reviews");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Job done", reviews);
        res
          .status(201)
          .json(reviews);
      }
    });
};

module.exports.reviewsUpdateOne = function(req, res) {
  var reviewId = req.params.reviewId;

  console.log('Update reviews', reviewId);

  Reviews
    .findById(reviewId)
    .exec(function(err, reviews) {
      if (err) {
        console.log("Error");
        res
          .status(500)
          .json(err);
          return;
      } else if(!reviews) {
        console.log("Reviews not found", reviewId);
        res
          .status(404)
          .json({
            "message" : "Reviews not found " + reviewId
          });
          return;
      }

      reviews.reviewBody = req.body.reviewBody;
      reviews.score = req.body.score;
      reviews._poem = req.body._poem; 
      reviews._reviewer =  req.body._reviewer;

      reviews
        .save(function(err, reviewsUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};


module.exports.reviewsDeleteOne = function(req, res) {
  var reviewId = req.params.reviewId;

  Reviews
    .findByIdAndRemove(reviewId)
    .exec(function(err, reviews) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Reviews deleted, id:", reviewId);
        res
          .status(204)
          .json();        
      }
    });
};
