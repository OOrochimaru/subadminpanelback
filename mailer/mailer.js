var nodemailer = require('nodemailer');
var email = require('../config/emailer');
// var urls = require('../config/url');
var lodash = require('lodash');

var content = '<html><head><meta charset="utf-8"><title>::Butwise::</title></head><body style="background:#eee;"><div><table style="width:620px; font-size:14px; font-family:arial; margin:0 auto; color:#333; background:#fff; padding:20px;" cellpadding="0" width="100%;"><tbody><tr><td style="padding-bottom:20px;" align="center"></td></tr><tr><td style="padding-bottom:10px;">{CONTENTOFHTML}</td></tr></tbody></table></div></body></html>';

var mailer = function(){
    var self = this;
    self.sendMailer = function(to, htmlText, subject, attachment, contact_email){
        var fromMail = email.admin.email;

        if (contact_email) {
            var fromMail = contact_email;
        }
        var toMail = to;

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            debug: true,
            auth: {
                user: email.admin.email,
                pass: email.admin.password
            }
        });
        var emailContent = lodash.replace(content, '{CONTENTOFHTML}', htmlText);
        transporter.sendMail({
            from: fromMail,
            to: toMail,
            subject: subject,
            attachments: attachment,
            html: emailContent
        }, function(err, response){
            if (err) {
                console.log("failed to send mail");
            }else{
                console.log('Mail send to '+ toMail);
            }
        })
    }
}
module.exports = mailer;