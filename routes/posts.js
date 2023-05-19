const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller');
const passport = require('passport');

//only if user is authenticated it will go to next process
router.post('/create',passport.checkAuthentication,postController.create);
module.exports = router;