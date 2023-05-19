//user controller

//user model
const User = require('../models/user');


module.exports.profile = function(req,res ){

    res.render('user_profile',{
        title:'User Porfile'
    });
};

module.exports.sign_up = function(req,res ){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_up',{
        title:'Codeial | Sign up'
    });
};

module.exports.sign_in = function(req,res ){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in',{
        title:'Codeial | Sign in'
    });
};

module.exports.create = function(req, res){
    console.log('creating the user!');
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body)
            .then((result)=>{
                console.log('User created!');
                return res.redirect('/users/sign-in');
            })
            .catch((error)=>{
                console.log('Error in creating the User!',error);
                return;
            })
        }
    })
    .catch((error)=>{
        console.log('Cannot load the Users(while creating the User) from the db!!!',error);
        return;
    })   
    
};

module.exports.create_session = function(req, res){
    return res.redirect('/');
    
};

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { 
            return console.log('Error in logging out!!',err);
        }
        res.redirect('/');
      });
}