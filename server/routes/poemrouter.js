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
router.get('/', poemController.getPoems); //from modules.export.getPoems in controller. QUESTION: I set up / url in server.js with app.use('/', poemrouter);, why?
// create a poem
router.post('/', poemController.createPoem);
// delete a poem
router.post('/delete', poemController.deletePoem);
// update a poem
router.post('/update', poemController.updatePoem);

module.exports = router;
console.log("End poemrouter")

