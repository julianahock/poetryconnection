var express = require('express');
console.log("Begin poemrouter");
var router = express.Router();

var poemController = require('../controllers/poemcontroller.js');

/* GET home page. */
// get request with URL / 
//router
//    .route('/')
//    .get(ctrlMain.index);

// or     

//Get all poems
router.get('/', poemController.getPoems); //from modules.export.getPoems in controller. QUESTION: we set up / url in server.js with app.use('/', poemrouter);, why?
//TODO need controller function to create a poem


module.exports = router;
console.log("End poemrouter")

