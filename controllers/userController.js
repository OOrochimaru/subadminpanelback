var User = require('../model/user');
var Job = require('../model/job');
var mail = require('../mailer/mailer');
module.exports.addEmployer = function(req, res, next){
    var user = new User();
    var r = req.body;
    user.role = 'Employer';
    if(r.companyname !== null){
        user.company_name = req.body.companyname;
    }
    if(r.contactname !== null){
        user.contact_name = req.body.contactname;
    }
    if(r.phone !== null){
        user.phone = req.body.phone;
    }
    if(r.email !== null){
        user.email = req.body.email;
    }
    if(r.url !== null){
        user.url = req.body.url;
    }
    if(r.password !== null){
        user.password = req.body.password;
    }
    if(r.address !== null){
        user.address = req.body.address;
    }
    if(r.description !== null){
        user.description = req.body.description;
    }

    User.findOne({email: r.email}).then((userr)=>{
        if (userr) {
            return res.json({status : 201, UserFound: 'User User Already Exists'});
        }
       new Promise((resolve, reject)=>{
                var mailer = new mail();
                mailer.sendMailer(user.email, "User Name: "+user.contact_name+
                "Password: "+user.password, "Signup Form");
                resolve(true);
            }).then(function(result){
                if (result === true) {
                    user.save().then(function(info){
                        return res.json({status: 200, success: "User Added"})
                    })
                }
            })
    })
};

module.exports.userlist = function(req, res, next){
    var totalRecords;
    User.find({}).count().then(function(count){
        totalRecords = count;
        console.log(count);
    });
    User.find({}).sort({lastUpdated:-1}).then(function(users, err){
        if (err) {
            return new Error(err);
        }
        // console.log(users);
        return res.json({data: users, totalRecords: totalRecords});
    })
};

module.exports.userinfo = function(req, res, next){
    console.log(req.params.userid);
    User.findOne({_id: req.params.userid}).then(function(user, err){
        if (!user) {
            next(err);
            return res.json({status: 401, message:'User not Found'});
        }
        if (err) {
            next(err);
            return res.json({status: 401, message:'User not Found'});
        }
        return res.json({status: 201, message: 'User Info Fetched', user: user});
    })
};

module.exports.updateuser = function(req, res, next){
    var r = req.body
    console.log(req.params);
    console.log(req.body);
    User.findOne({_id: req.params.userid}).then(function(user){
        if (!user) {
            return res.json({status: 401, message: 'User Not Found'});
        }
        User.findByIdAndUpdate( req.params.userid,
            { $set: { "email" : r.email, "contact_name" : r.contactname, "address":r.address,
        "phone": r.phone, "company_name":r.companyname, "lastUpdated": Date.now()} }
        ).then(function(user){
            if (user) {
                return res.json({status: 200, message:'updated Successfully'});
            }
        })
    })
};

module.exports.deleteuser = function(req, res, next){
    User.findById(req.params.userid).then(function(user){
        if (!user) {
            return res.json({status: 403, message: 'user Not found'})
        }
        User.findByIdAndRemove(req.params.userid).then(function(user){
            if (user) {
                return res.json({status: 200, message: 'User Deleted Successfully'});
            }
        })
    })
};

module.exports.getEmployers = function(req, res, next){
    User.find({role: 'Employer'}).then(function(employers){
        if (!employers) {
            return res.json({status: 401, message: 'employers not found'});
        }
        return res.json({status: 200, message: 'employers fetched', data: employers})
    })
 console.log("getemployers");   
};

module.exports.getSearched = function(req, res, next){
    var search = { "$regex": req.body.data, "$options": "i"};
    console.log(search);
    User.find({$or: [{email: search}, {contact_name: search}, {company_name: search}]})
    .then(function(result){
        if (!result) {
            return res.json({status: 'failed'});
        }
        console.log(result);
        return res.json({status: 200, message: 'User Found', data:result })
    })
};

module.exports.paginationUsers = function(req, res, next){
    console.log(req.body);
    if (req.body.paginate) {
        var pagination = req.body.paginate;
        var limit = pagination.rows;
        var skip = pagination.first;
        
    }else{
        var skip = req.body.skip;
        var limit = req.body.limit;
    }
    var totalRecords;
    console.log("pagination",req.body.page)
    console.log("sakip", skip)
    console.log("limit", limit)
    User.find({}).count().then(function(count){
        totalRecords = count;
        console.log(count);
    });
    User.find({}).limit(limit).skip(skip).then(function(users){
        if (!users) {
            return res.json({status: 401, message: 'Wrong '})
        }
        return res.json({status: 200, message: 'right', data: users, totalRecords: totalRecords})
    })
    console.log(req.body);
};

module.exports.postAjob = function(req, res, next){
    var r = req.body.data;
    console.log(r);
    var job = new Job();
    job.jobTitle = r.jobTitle;
    job.company_name = r.companyName;
    job.location = r.jobLocation;
    job.experience = r.experience;
    job.jobType = r.jobType;
    job.description = r.description;

    job.save().then(function(saved){
        return res.json({status: 200, message: 'saved', data: saved});
    })

}