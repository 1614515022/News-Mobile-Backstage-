
var express = require('express');
var router = express.Router();
var createController = require('../controller/createController');
var getClass = require('../controller/getClass');
var newsEdit = require('../controller/newsController');
//var record = require('../controller/recordController');
/* GET home page. */



router.post('/register',createController.userRegister)
router.post('/login',createController.userLogin)
router.get('/getClass',getClass.getClass)
router.get('/mainContent',getClass.mainContent)
router.post('/detailContent',getClass.pageContent)
router.post('/getCollection',getClass.getCollection)
router.post('/getRead',getClass.getRead)

router.post('/newsUpdate',newsEdit.newsUpdate)
router.post('/newsInsert',newsEdit.newsInsert)
router.post('/newsDelete',newsEdit.newsDelete)
router.post('/newsFind',newsEdit.newsFind)

//router.post('/collection/:id',record.collection)

module.exports = router;


