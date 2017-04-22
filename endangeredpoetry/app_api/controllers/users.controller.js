var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports.usersGetAll = function(req, res) {

  console.log('Read All Users');
  
  //If ?screenName= passed in, search by screenName
  var findParameters={};
  var screenName=req.query.screenName;
  if (screenName!=null && screenName.length>0)
    findParameters.screenName=screenName;             

  Users
    .find(findParameters)    //exec tells to execute query 
    .exec(function(err, users) {    //users is the return data
      console.log("Found Users", users.length);
      //console.log(users);
      res
        .json(users);  // creates json response with the data 
    });

};


module.exports.usersGetOne = function(req, res) {
  console.log('Read one users');
  var id = req.params.userId;
  console.log('req.params ', req.params);
  console.log('GET userId', id);

  Users
    .findById(id)
    .exec(function(err, doc) {
      if (err) {
        console.log("can't get users", id);
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


module.exports.usersAddOne = function(req, res) {
  console.log("POST new users");

  console.log('req params body' , req.params, req.body);

  Users
    .create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        screenName : req.body.screenName,
        email : req.body.email
     
    }, function(err, users) {
      if (err) {
        console.log("can't create users:" + err);
        res
          .status(400)
          .json(err);
      } else {
        console.log("Job done", users);
        res
          .status(201)
          .json(users);
      }
    });
};

module.exports.usersUpdateOne = function(req, res) {
  var userId = req.params.userId;

  console.log('Update users', userId);

  Users
    .findById(userId)
    .exec(function(err, users) {
      if (err) {
        console.log("Error");
        res
          .status(500)
          .json(err);
          return;
      } else if(!users) {
        console.log("Users not found", userId);
        res
          .status(404)
          .json({
            "message" : "Users not found " + userId
          });
          return;
      }

      users.firstName = req.body.firstName;
      users.lastName = req.body.lastName;
      users.screenName = req.body.screenName; 
      users.email =  req.body.email;

      users
        .save(function(err, usersUpdated) {
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


module.exports.usersDeleteOne = function(req, res) {
  var userId = req.params.userId;

  Users
    .findByIdAndRemove(userId)
    .exec(function(err, users) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Users deleted, id:", userId);
        res
          .status(204)
          .json();        
      }
    });
};
