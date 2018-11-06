var database = require('../config/database');
var User = require('../model/user');
var jwt = require('jsonwebtoken')

module.exports.login = function(obj, callback){
    User.findOne({email: obj.email}).exec(function(err, user){
        if (err) {
            callback (err, null);
        }
        if (!user) {
            const user = new User({
                facebook_id : obj.facebook_id,
                google_id : obj.google_id,
                linkedIN_id : obj.linkedin_id,
                twitter_id : obj.twitter_id,
                name : obj.profile.displayName,
                email : obj.email,
                provider : obj.profile.provider,
                isVerified : true,
                socialLogin : true
sdfsdfs
            });
            user.save(function(err, user){
                if (err) {
                    callback(err, null);
                }else{

                }

            })
        }
    })    
}