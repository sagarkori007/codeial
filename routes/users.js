const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');

//request is calling the users_controller.profile
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/profile/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-in',userController.sign_in);
router.get('/sign-up',userController.sign_up);
router.post('/create',userController.create);

//use passport as middle wear to authenticate - takes 3 parameters 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.create_session);

router.get('/sign-out',userController.destroySession);


//google auth
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.create_session);



//not sure y
module.exports = router;