const express = require('express');
const router = express.Router();

//load the controller
const homeController = require('../controllers/home_controller');

//navigate / request to home controlller
router.get('/',homeController.home);

//navigate /users to users.js
//same you can do for other urls
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//check, message
console.log('router loaded!!')

module.exports = router;