var Poem = require('../models/poemmodel');

module.exports.getPoems = function(req, res){
        console.log("Hello from controller");
        Poem.find({}, function(err, data){
            res.render("index.jade",{poems:data}) //pass poems to index.jade template so it can iterate it
        });
}

module.exports.createPoem = function(req, res){
    console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
    var poem = new Poem();                  //Create a new poem
    poem.title = req.body.title;
    poem.author = req.body.author;
    poem.poemBody = req.body.poemBody;
        
    poem.save(function(err, data){
        if(err)
            throw err;
//        res.json(data);
        Poem.find({}, function(err, data){
            res.render("index.jade",{poems:data}) //pass poems to index.jade template so it can iterate it
        });
        
    });
}

module.exports.deletePoem = function(req, res){
    console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
    Poem.remove({_id: req.body._id}, function(err){
        Poem.find({}, function(err, data){
            res.render("index.jade",{poems:data}) //pass poems to index.jade template so it can iterate it
        });
    })
}

module.exports.updatePoem = function(req, res){
    console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
        Poem.findOne({_id: req.body._id}, function(err, data){
            var poem = data;
            poem.title = req.body.title;
            poem.author = req.body.author;
        
            poem.save(function(err, data){
                if(err)
                    throw err;
                Poem.find({}, function(err, data){
                    res.render("index.jade",{poems:data}) //pass poems to index.jade template so it can iterate it
                });
            });
        })
}