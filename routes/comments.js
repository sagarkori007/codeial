const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments_controller');
const passport = require('passport');

//only if user is authenticated it will go to next process
router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);
module.exports = router;