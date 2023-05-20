//
const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new local_strategy({
        usernameField: 'email',
        passReqToCallback: true //to send the req, for req.flash
    },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email})
        .then((user)=>{
            if (!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            //if everything is fine return done/user
            //it returns the user to serializerUser function 
            return done(null, user);
        })
        .catch((error)=>{
            console.log('Error in finding user --> Passport');
            return done(error);
        })

    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then((result)=>{
        return done(null, result);
    })
    .catch((error)=>{
        console.log('Error in finding user --> Passport');
        return done(error);
    })
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is authenticated, then pass on to the next functin(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not authenticates
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current digned in user from the session cookie 
        //and we are just sending this to the locals for the 
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
