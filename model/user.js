var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    company_name: {type: String},
    contact_name: {type: String},
    password : {type: String},
    description : {type: String},
    url : {type: String},
    phone: {type: Number},
    address: {type: String},
    role: {type: String},
    
    status : Boolean,
    email: {type: String, required:true, unique: true},
    facebook_id : {type: String},
    google_id : {type: String},
    linkedIN_id : {type: String},
    twitter_id : {type: String},
    provider : {type: Array, default: ''},
    token: {
        type: String,
        default: ''
      },
    isVerified: {
        type: Boolean,
        default: false
      },
      sociallogin: {
        type: Boolean,
        default: false
      },
      systemlogin: {
        type: Boolean,
        default: false
      }
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'lastUpdated'}});

module.exports = mongoose.model('user', UserSchema);