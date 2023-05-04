const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

//request is calling the users_controller.profile
router.get('/profile',userController.profile);

router.get('/sign-in',userController.sign_in);
router.get('/sign-up',userController.sign_up);
router.post('/create',userController.create);
//not sure y
module.exports = router;