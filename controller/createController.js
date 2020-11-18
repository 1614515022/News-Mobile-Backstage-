const { json } = require('body-parser');
var crypto = require('crypto');
var sqlQuery = require('../util/dbconfig');
const jwt = require('jsonwebtoken');


//加密
function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

let userRegister = async(req,res)=>{
    //获取username和password
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    //判断用户是否存在,如果没有用户才进行插入
    let sqlStr = "select * from user where username = ?";
    let result = await sqlQuery(sqlStr,[username]);
    let payload = {username};
    let secret = 'XIA_FANG_JUN';
    let token = jwt.sign(payload,secret);

    if(result.length!=0){
        //告知此用户名已存在，请直接登陆或者找寻密码
        res.send({
            "code":400,
            "msg":"该账号已经注册过了"
        })
    }else if(repassword != password){
        res.send({
            "code":401,
            "msg":"两次输入的密码不一致"
        })
    }else{
        //告知注册成功
        sqlStr = "insert into user (username,password) values (?,?)"
        await sqlQuery(sqlStr,[username,jiami(password)])
        sqlStr = "select id from user where username = ?"
        let resId = await sqlQuery(sqlStr,[username])
        res.send({
            "code": 200,
            "msg":"注册成功",
            "data":{token,resId}
        })
    }
}

//处理登陆提交的post请求
let userLogin = async (req,res)=>{
    //获取username和密码
    let username = req.body.username;
    let password = req.body.password;
    let sqlStr = "select * from user where username=? and password = ?";
    let result = await sqlQuery(sqlStr,[username,jiami(password)])
    let payload = {username};
    let secret = 'XIA_FANG_JUN';
    let token = jwt.sign(payload,secret);

    if(result.length==0){
        //登陆失败
        res.send({
            "code":400,
            "msg":"用户名或密码不正确，请重新输入",
            
        })
    }else{
        res.send({
            "code":200,
            "msg":"登录成功，即将进入界面",
            "data":{result,token}
        })
    }
}

module.exports = {
    userRegister,userLogin
}