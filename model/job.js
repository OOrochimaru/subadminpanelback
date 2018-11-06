var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    company_name: {type: String},
    contact_name: {type: String},
    jobTitle: {type: String, required:true},
    location : {type: String},
    description : {type: String},
    email : {type: String},
    phone: {type: Number},
    experience: {type: String},
    jobType: {type: String},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'lastUpdated'}});

module.exports = mongoose.model('job', jobSchema);