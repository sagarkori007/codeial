const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTstrategy(opts,function(payload,done){
    User.findById(payload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;