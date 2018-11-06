var database = require('../config/database');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

module.exports.login = function(obj, callback){
    User.findOne({email: obj.email}).exec(function(err, user){
        if (err) {
            callback (err, null);
        }
        if (!user) {
            const user = new User({
                facebook_id : obj.facebook_id,
                google_id : obj.google_id,
                linkedIN_id : obj.linkedIN_id,
                twitter_id : obj.twitter_id,
                name : obj.profile.displayName,
                email : obj.email,
                provider : obj.profile.provider,
                isVerified : true,
                socialLogin : true

            });
            user.save(function(err, user){
                if (err) {
                    callback(err, null);
                }else{
                    let token = jwt.sign({id : user._id}, config.secret, {expiresIn: 86400});
                    User.findByIdAndUpdate({_id: user._id }, {$set: {token : token}})
                    .exec(function(err, user){
                        if (err) {
                            callback(err, null);
                        }else{
                            callback(null, token);
                        }

                    })
                }

            })
        }else{ // if the user already exist in the database
            let token = jwt.sign({id : user._id}, config.secret, {expiresIn: 86400});
            let socialFlag = false;
            
            if (user.facebook_id === obj.facebook_id ||
                user.google_id === obj.google_id ||
                user.twitter_id === obj.twitter_id ||
                user.linkedIN_id === obj.linkedIN_id      
            ) {
                
            }
        }
    })    
}