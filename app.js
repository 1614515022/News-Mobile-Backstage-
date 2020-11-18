var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyparser = require("body-parser")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//允许跨域
app.use(require("cors")())
//转换格式
app.use(express.json())



var http = require('http');
var server = http.createServer(app);


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));

//post请求
app.use(bodyparser.urlencoded({extended: true}));
app.use('/', indexRouter);
app.use('/users', usersRouter);



server.listen("3000")
