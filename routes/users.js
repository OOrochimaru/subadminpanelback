var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
/* GET users listing. */
router.post('/addEmployer', userController.addEmployer);
router.get('/userlist', userController.userlist);
router.get('/getemployers', userController.getEmployers);
router.post('/getSearched', userController.getSearched)
router.post('/paginationUsers', userController.paginationUsers)
router.post('/postAjob', userController.postAjob);
router.put('/:userid/update', userController.updateuser);
router.delete('/:userid/delete', userController.deleteuser);
router.get('/:userid/deactivate', userController.deactivate);
router.get('/:userid/reactivate', userController.reactivate);
router.get('/:userid', userController.userinfo);
module.exports = router;
