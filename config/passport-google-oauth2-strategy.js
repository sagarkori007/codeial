const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//use new strategy for google login
passport.use(new googleStrategy({
        clientID: "631694264989-8a7ajpic7515gu8c7913p96sp1givg7e.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){
                console.log('Google strategy error',err);
                return;
            }

            console.log(profile);
            if (user){
                //if found set this as req.user
                return done(null, user);
            } else {
                //if not found create the user and set req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if (err){
                        console.log('error in creating the user google passport',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;
