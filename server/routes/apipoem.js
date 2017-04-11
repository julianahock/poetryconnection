var models = require('../models/models');
module.exports = function(router){

    //******************POEMS*********************
    
    //Create a new poem record from /api/poem url
    router.post('/poem', function(req, res){    //
        console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
        var poem = new models.Poem();                  //Create a new poem
        poem.title = req.body.title;
        poem.author = req.body.author;
        poem.poemBody = req.body.poemBody;
        
        poem.save(function(err, data){
            if(err)
                throw err;
            res.json(data);                     
        });
    })
    
    //TODO need to return a score field that averages all Review.score for the poem https://docs.mongodb.com/manual/reference/operator/aggregation/avg/
    
    //Show all poems from /api/poems url
    router.get('/poems', function(req, res){
        //https://docs.mongodb.com/manual/reference/method/db.collection.find/ 
        var findParameters={};
        var title=req.query.title;
        if (title!=null && title.length>0)
        {
            //https://docs.mongodb.com/manual/reference/operator/query/regex/
            // { name: { $regex: /acme.*corp/, $options: "si" } }
            findParameters.title={$regex: title, $options: "si"}; 
        }
        var author = req.query.author;
        if (author!=null && author.length>0)
        {
            findParameters.author={$regex: author, $options: "si"}; 
        }
        models.Poem.find(findParameters, function(err, allPoems){   //first get all the poems
            models.Review.aggregate(                    // Then get the average review scores of each poem https://docs.mongodb.com/manual/reference/operator/aggregation/avg/
                                                        //$sum lets us count reviews same as we average them with $avg http://stackoverflow.com/questions/23116330/mongodb-select-count-group-by
            [{$group:{_id: "$_poem",avgScore: { $avg: "$score" }, numberReviews : {$sum:1} }}],           //This means group each average for all reviews with the same Review._poem id. Each poem will have its one entry with average score
                function(err, scores) //This is called when the calculation of averages is done calculating for all reviews
                {
                    for (var scoreIndex = 0; scoreIndex < scores.length; scoreIndex++) { //for each score
                         for (var poemIndex = 0; poemIndex < allPoems.length; poemIndex++)                        
                         {
                             if (scores[scoreIndex]._id!=null)
                             {
                                 console.log("score ID" + scores[scoreIndex]._id.valueOf());
                                 console.log("poem ID " + allPoems[poemIndex]._doc._id.valueOf());
                                 if (scores[scoreIndex]._id.equals(allPoems[poemIndex]._doc._id)) //https://docs.mongodb.com/manual/reference/method/ObjectId.valueOf/
                                 {
                                     allPoems[poemIndex]._doc.score=scores[scoreIndex].avgScore;
                                     allPoems[poemIndex]._doc.numberReviews=scores[scoreIndex].numberReviews;
                                     break;
                                 }
                                 allPoems[poemIndex]._doc.score=0;          //If we get here, we didn't find any Review._poem that matched the Poem._id, so init to 0
                                 allPoems[poemIndex]._doc.numberReviews=0;
                             }
                         }
                    }
                    res.json(allPoems); //Send the data results of the find back as json in the response
                }
        )                         
        });

    });
    
    //get a specific poem from /api/poems/<ID>
    router.get('/poems/:id', function(req, res){
        models.Poem.findOne({_id: req.params.id}, function(err, poemData){
            if (poemData!=null) //it can be null if no id is found
            {
                models.Review.aggregate(                                                                         // https://docs.mongodb.com/manual/core/aggregation-pipeline/
                    [{$match:{_poem: poemData._doc._id}}, //get average reviews for only one poem indicated by poemData._doc._id
                        {$group:{_id: "$_poem",avgScore: { $avg: "$score" }, numberReviews : {$sum:1} }}],
                    function(err, scores)   
                    {
                        if (poemData !=null && scores.length>0)
                        {
                            poemData._doc.score=scores[0].avgScore;            //the $match means only one is returned
                            poemData._doc.numberReviews=scores[0].numberReviews;
                        }
                        else
                        {
                            poemData._doc.score=0;
                            poemData._doc.numberReviews=0;
                        }
                        res.json(poemData);
                    }
                )
            } else {
                res.json(); //send a null response
            }
        })
    })
    
    //update a specific poem from /api/poems/<ID>
    router.post('/poems/:id', function(req, res){
        models.Poem.findOne({_id: req.params.id}, function(err, data){
            var poem = data;
            poem.title = req.body.title;
            poem.author = req.body.author;
        
            poem.save(function(err, data){
                if(err)
                    throw err;
                res.json(data);
            });
        })
    })

    //delete a specific poem from /api/poems/<ID>
    router.delete('/poems/:id', function(req, res){
        models.Poem.remove({_id: req.params.id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        })
    })
    
    //Delete all poems from /api/poems url
    router.delete('/poems', function(req, res){
        models.Poem.remove({}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
    });
}