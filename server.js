var express = require('express');
var app = express();
//native nodeJS module for resolving paths
var path = require('path');


var bodyParser = require('body-parser') // requires npm install --save body-parser
app.use( bodyParser.json() ); //to make REST api.js work to accept JSON
//app.use(bodyParser.urlencoded()); // to support URL-encoded bodies for jade html forms

//When starting mongod use mongod --smallfiles option
var mongoose = require('mongoose');
var configDB = require('./server/config/database.js')

mongoose.connect(configDB.url);

//get our Internet Protocol (IP) port number from cloud9's global environment variable: PORT
var port = process.env.PORT;

//Set our view enging to Jade, and set the directory our views are stored in
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//server static files (html, images, css) from client folder
//ex: libs/bootstrap/bootstrap.css url in our html files actually points to client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'client')));


var api = express.Router();
require('./server/routes/apipoem')(api);
require('./server/routes/apiuser')(api);
require('./server/routes/apireview')(api);
app.use('/api', api); //The url root for this router is /api

console.log("Begin set up router for jade");
var poemrouter = require('./server/routes/poemrouter');
app.use('/', poemrouter); //The url root for this router is /
console.log("End set up router");

//Moved this to poemcontroller.js
//set our first route to our home view defined in our index.jade template file
// app.get('/', function(req, res){
//   res.render('index.jade', {poems :[{title: 'bla', author : 'blip'}, {title: 'blue', author: 'purple'}]});
// })

//make our app listen for incoming web browser requests on the server IP port assigned above on line 12
app.listen(port, function(){
  console.log('SERVER RUNNING... port ' + port);
})