var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    company_name: {type: String},
    contact_name: {type: String},
    email: {type: String, required:true},
    password : {type: String},
    description : {type: String},
    url : {type: String},
    phone: {type: Number},
    address: {type: String},
    role: {type: String},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'lastUpdated'}});

module.exports = mongoose.model('user', UserSchema);