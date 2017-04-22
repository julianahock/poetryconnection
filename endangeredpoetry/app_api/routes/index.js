// routes with URL /api are sent here 
//    /api

var express = require('express');
var router = express.Router();

var ctrlPoems = require('../controllers/poems.controller.js');
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlReviews= require('../controllers/reviews.controller.js');

// CRUD actions for Poems 
router
    .route('/poems')
    .get(ctrlPoems.poemsGetAll)
    .post(ctrlPoems.poemsAddOne);

router
  .route('/poems/:poemId')
  .put(ctrlPoems.poemsUpdateOne)
  .delete(ctrlPoems.poemsDeleteOne)
  .get(ctrlPoems.poemsGetOne);


// CRUD actions for Users
router
    .route('/users')
    .get(ctrlUsers.usersGetAll)
    .post(ctrlUsers.usersAddOne);

router
  .route('/users/:userId')
  .put(ctrlUsers.usersUpdateOne)
  .delete(ctrlUsers.usersDeleteOne)
  .get(ctrlUsers.usersGetOne);


// CRUD actions for Reviews
router
    .route('/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
  .route('/reviews/:reviewId')
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne)
  .get(ctrlReviews.reviewsGetOne);

module.exports = router;
