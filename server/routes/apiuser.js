var models = require('../models/models');
module.exports = function(router){


    //******************USERS*********************
    //Create a new user record from /api/user url
    router.post('/user', function(req, res){    //
        console.log("Body:" + req.body);        //require('body-parser') accepts body as JSON
        var user = new models.User();                  //Create a new user
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.screenName = req.body.screenName;
        user.email = req.body.email;
        
        user.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    })
    
    //Show all users from /api/users url
    router.get('/users', function(req, res){
    //https://docs.mongodb.com/manual/reference/method/db.collection.find/
        var findParameters={};
        var screenName=req.query.screenName;
        if (screenName!=null && screenName.length>0)
            findParameters.screenName=screenName;             
        models.User.find(findParameters, function(err, data){
            res.json(data);
        });
    });
    
    //get a specific user from /api/users/<ID>
    router.get('/users/:id', function(req, res){
        models.User.findOne({_id: req.params.id}, function(err, data){
            res.json(data);
        })
    })
    
    //update a specific user from /api/users/<ID>
    router.post('/users/:id', function(req, res){
        models.User.findOne({_id: req.params.id}, function(err, data){
            var user = data;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.screenName = req.body.screenName;
            user.email = req.body.email;
        
            user.save(function(err, data){
                if(err)
                    throw err;
                res.json(data);
            });
        })
    })
    
    //delete a specific user from /api/users/<ID>
    router.delete('/users/:id', function(req, res){
        models.User.remove({_id: req.params.id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        })
    })
    
    //Delete all users from /api/users url
    router.delete('/users', function(req, res){
        models.User.remove({}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
        models.User.drop();
    });
    

}