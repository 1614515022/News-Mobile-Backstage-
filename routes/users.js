var express = require('express');
var router = express.Router();
var user= require('../controller/userController');
router.get('/userTable', user.userTable);
router.post('/userInsert', user.userInsert);
router.post('/userUpdate', user.userUpdate);
router.post('/userDelete',user.userDelete)
router.post('/getUserMeg',user.getUserMeg);
router.post('/userFind',user.userFind);

module.exports = router;
