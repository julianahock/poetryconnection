var Poem = require('../models/poemmodel');
module.exports = function(router){
    //Create a new poem record from /api/poem url
    router.post('/poem', function(req, res){    //
        console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
        var poem = new Poem();                  //Create a new poem
        poem.title = req.body.title;
        poem.author = req.body.author;
        
        poem.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    })
    
    //Show all poems from /api/poems url
    router.get('/poems', function(req, res){
        Poem.find({}, function(err, data){
            res.json(data);
        });
    });
    
    //Delete all poems from /api/poems url
    router.delete('/poems', function(req, res){
        Poem.remove({}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
    });
    
    //get a specific poem from /api/poems/<ID>
    router.get('/poems/:id', function(req, res){
        Poem.findOne({_id: req.params.id}, function(err, data){
            res.json(data);
        })
    })
    
    //delete a specific poem from /api/poems/<ID>
    router.delete('/poems/:id', function(req, res){
        Poem.remove({_id: req.params.id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        })
    })
    
    //delete a specific poem from /api/poems/<ID>
    router.post('/poems/:id', function(req, res){
        Poem.findOne({_id: req.params.id}, function(err, data){
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
}