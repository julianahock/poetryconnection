require('./app_api/models/db.js');  // using mongoose to connect to DB 
var express = require('express');
var app = express();
var bodyParser = require('body-parser') // requires npm install --save body-parser
var path = require('path');
var routesApi = require('./app_api/routes/index');

app.set('port', process.env.PORT);

app.use( bodyParser.json() ); //to make REST api.js work to accept JSON
app.use('/api', routesApi); //The url root for this router is /api

//server static files (html, images, css) from client folder
//ex: libs/bootstrap/bootstrap.css url in our html files actually points to app_client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'app_client')));

//make our app listen for incoming web browser requests on the server IP port assigned above on line 12
var server = app.listen(app.get('port'), function() {
       console.log('I am listening on port ' + server.address().port);
});
