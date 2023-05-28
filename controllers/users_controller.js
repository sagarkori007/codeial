//user controller

//user model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res ){
    User.findById(req.params.id,function(err,user){
        res.render('user_profile',{
            title:'User Porfile',
            profile_user: user
        });
    });
};

module.exports.update = async function(req,res){
    console.log('Profile update!!')
    // if (req.user.id == req.params.id){
    //     console.log('updating the user',req.user.name);
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','Profile updated');
    //         return res.redirect('back');
    //     });
    // } else {
    //     req.flash('error','Error in Profile updating!');
    //     return res.status(401).send('Unauthorized');
    // }

    //changed code due to the multer - file uploading 
    if (req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            //multer - headache concept 
            User.uploadedAvatar(req, res, function(err){
                if (err){
                    console.log(err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){
                    // this is saving the uploaded file into the avatar field in the user
                    if (user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });


        } catch(error) {
            req.flash('error',error);
            return;
        }

        
    } else {
        req.flash('error','Error in Profile updating!');
        return res.status(401).send('Unauthorized');
    }


}

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
                req.flash('success','User created!');
                return res.redirect('/users/sign-in');
            })
            .catch((error)=>{
                req.flash('error','Unable to create the user');
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
    req.flash('success','Logged in successfully!!!');
    return res.redirect('/');
    
};

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { 
            return console.log('Error in logging out!!',err);
        }
        req.flash('success','Logged out successfully!!!');
        res.redirect('/');
      });
}