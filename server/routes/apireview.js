var models = require('../models/models');
module.exports = function(router){


    //******************REVIEWS*********************
    // Create a new review record from /api/review url
    // reviewBody - text for the review 
    // score - an integer score from 0 to 5
    // userId - the mongo id for the reviewer's User record
    // poemId - the mongo id for the poem's Poem record
    router.post('/review', function(req, res){    //
        console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
        var review = new models.Review();                  //Create a new review
        review.reviewBody = req.body.reviewBody;
        review.score = req.body.score;
        review._poem = req.body.poemId;
        review._reviewer = req.body.userId;
        
        review.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    })

    //Show all reviews from /api/reviews?userId=XXXX&poemId=YYYY http://expressjs.com/en/api.html#req.query
    // userId = find all poems where Review._reviewer == userId
    // poemId = find all poems where Review._poem == poemId
    router.get('/reviews', function(req, res){
        //https://docs.mongodb.com/manual/reference/method/db.collection.find/
        var findParameters={};
        var _poem=req.query.poemId;
        if (_poem!=null && _poem.length>0)
            findParameters._poem=_poem;        
        var _reviewer = req.query.userId;
        if (_reviewer!=null && _reviewer.length>0)
            findParameters._reviewer=_reviewer;        
        models.Review.find(findParameters, function(err, data){
            res.json(data);
        });
    });
    
    //get a specific review from /api/review/<ID>
    router.get('/reviews/:id', function(req, res){
        models.Review.findOne({_id: req.params.id}, function(err, data){
            res.json(data);
        })
    })
    
    //update a specific review from /api/reviews/<ID>
    router.post('/reviews/:id', function(req, res){
        models.Review.findOne({_id: req.params.id}, function(err, data){
            if(err) //handle the error
                throw err;
            var review = data;
            review.reviewBody = req.body.reviewBody;
            review.score = req.body.score;
        
            review.save(function(err, data){
                if(err)
                    throw err;
                res.json(data);
            });
        })
    })

    //delete a specific review from /api/users/<ID>
    router.delete('/reviews/:id', function(req, res){
        models.Review.remove({_id: req.params.id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        })
    })
    
    //Delete all reviews from /api/reviews url
    router.delete('/reviews', function(req, res){
        models.Review.remove({}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
    });
    
}