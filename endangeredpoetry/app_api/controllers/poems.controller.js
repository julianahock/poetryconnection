var mongoose = require('mongoose');
var Poems = mongoose.model('Poems');
var Reviews = mongoose.model('Reviews'); //Required to merge in score and numberReviews

module.exports.poemsGetAll = function(req, res) {

  console.log('Read All Poems');

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
        
  Poems
    .find(findParameters)    //exec tells to execute query 
    .exec(function(err, poems) {    //1st get the poems
      console.log("Found Poems", poems.length);
      //console.log(poems);
      
      // Then get the average review scores of each poem https://docs.mongodb.com/manual/reference/operator/aggregation/avg/
      Reviews.aggregate(                    
        //$sum lets us count reviews same as we average them with $avg http://stackoverflow.com/questions/23116330/mongodb-select-count-group-by
        [{$group:{_id: "$_poem",avgScore: { $avg: "$score" }, numberReviews : {$sum:1} }}],           //This means group each average for all reviews with the same Review._poem id. Each poem will have its one entry with average score
            function(err, scores) //This is called when the calculation of averages is done calculating for all reviews
            {
                for (var scoreIndex = 0; scoreIndex < scores.length; scoreIndex++) { //for each score
                     for (var poemIndex = 0; poemIndex < poems.length; poemIndex++)  //Search for the corresponding poem for each score                       
                     {
                         if (scores[scoreIndex]._id!=null)
                         {
                             console.log("score ID" + scores[scoreIndex]._id.valueOf());
                             console.log("poem ID " + poems[poemIndex]._doc._id.valueOf());
                             if (scores[scoreIndex]._id.equals(poems[poemIndex]._doc._id)) //https://docs.mongodb.com/manual/reference/method/ObjectId.valueOf/
                             {
                                 poems[poemIndex]._doc.score=scores[scoreIndex].avgScore;
                                 poems[poemIndex]._doc.numberReviews=scores[scoreIndex].numberReviews;
                                 break; //We found the poem for the score so break from the poem loop
                             }
                             poems[poemIndex]._doc.score=0;          //If we get here, we didn't find any Review._poem that matched the Poem._id, so init to 0
                             poems[poemIndex]._doc.numberReviews=0;
                         }
                     }
                }
                res.status(200).json(poems); //Send the data results of the find back as json in the response. This is short hand for res.status(200); res.json(poems);
            }
        )
  });

};


module.exports.poemsGetOne = function(req, res) {
  console.log('Read one poems');
  var id = req.params.poemId;
  console.log('req.params ', req.params);
  console.log('GET poemId', id);

  Poems
    .findById(id)
    .exec(function(err, poem) {
      if (err) {
        console.log("can't get poems", id);
        res.status(400).json(err);
      } else {
        if (poem!=null) //it can be null if no id is found
        {
          Reviews.aggregate(                                                                         // https://docs.mongodb.com/manual/core/aggregation-pipeline/
            [{$match:{_poem: poem._doc._id}}, //get average reviews for only one poem indicated by poemData._doc._id
              {$group:{_id: "$_poem",avgScore: { $avg: "$score" }, numberReviews : {$sum:1} }}],
              function(err, scores)   
              {
                if (poem !=null && scores.length>0)
                {
                  poem._doc.score=scores[0].avgScore;            //the $match means only one is returned
                  poem._doc.numberReviews=scores[0].numberReviews;
                }
                else
                {
                  poem._doc.score=0;
                  poem._doc.numberReviews=0;
                }
                res.status(200).json(poem);  
               }
              )
            } else {
                res.json(); //send a null response
            }
      }  
    });

};


module.exports.poemsAddOne = function(req, res) {
  console.log("POST new poems");

  console.log('req params body' , req.params, req.body);

  Poems
    .create({
        title : req.body.title,
        author : req.body.author,
        poemBody : req.body.poemBody
     
    }, function(err, poems) {
      if (err) {
        console.log("can't create poems");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Job done", poems);
        res
          .status(201)
          .json(poems);
      }
    });
};

module.exports.poemsUpdateOne = function(req, res) {
  var poemId = req.params.poemId;

  console.log('Update poems', poemId);

  Poems
    .findById(poemId)
    .exec(function(err, poems) {
      if (err) {
        console.log("Error");
        res
          .status(500)
          .json(err);
          return;
      } else if(!poems) {
        console.log("Poems not found", poemId);
        res
          .status(404)
          .json({
            "message" : "Poems not found " + poemId
          });
          return;
      }

      poems.title = req.body.title;
      poems.author = req.body.author;
      poems.poemBody = req.body.poemBody; 

      poems
        .save(function(err, poemsUpdated) {
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


module.exports.poemsDeleteOne = function(req, res) {
  var poemId = req.params.poemId;

  Poems
    .findByIdAndRemove(poemId)
    .exec(function(err, poems) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Poems deleted, id:", poemId);
        res
          .status(204)
          .json();        
      }
    });
};
