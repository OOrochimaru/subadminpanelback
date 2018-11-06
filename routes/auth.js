var router = require('express').Router();
var User = require('../model/user');
var passportFacebook = require('../auth/facebook.auth');
const socialLogin = require('../controllers/socialLoginController');

router.get('/facebook', passportFacebook.authenticate('facebook'));
router.get('/facebook/callback', passportFacebook.authenticate('facebook', 
{failureRedirect: 'localhost:4200/login'}), function(req, res, next){
    let token = req.user;
    res.redirect("localhost:4200/"); //+token at the end if you have want to rout to the home page
});

module.exports = router;