var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/user');
var config = require('../config/facebook');
var socialLogin = require('../controllers/socialLoginController');
passport.use(new FacebookStrategy({
    clientID : config.facebook_api_key,
    clientSecret : config.facebook_api_secret,
    callbackURL : config.callback_url,
    profileFields : ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
}, function facebookHandler(accessToken, refreshToken, profile, done){
    if (!profile.emails || !profile.emails[0].value || !profile._json.email) {
        throw new UnprocessableEntity('No Email Attached');
    }
    let email = profile.emails[0].value || profile._json.email;
    const obj = {
        email: email,
        profile : profile,
        facebook_id : profile.id,
    };
    socialLogin.login(obj, function(err, objData){
        if (err) {
            return done(err, null)
        }
        return done(null, objData)
    })
}));

module.exports = passport;