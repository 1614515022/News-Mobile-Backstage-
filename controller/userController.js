const { json } = require('body-parser');
var crypto = require('crypto');
var sqlQuery = require('../util/dbconfig');

function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

let userTable = async(req,res)=>{
    let sqlStr = "select * from user";
    let result = await sqlQuery(sqlStr);
    if(result.length!=0){
        res.send({
            "data":result
        })
    }
}

let getUserMeg = async (req,res) => {
    let menberId = req.body.menberId;
    let sqlStr = "select * from user where id=?";
    let result = await sqlQuery(sqlStr,[menberId]);
    if(result.length!=0){
        res.send({
            "data":result
        })
    }
}

let userInsert = async(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let nickname = req.body.nickname
    let age = req.body.age
    let sex = req.body.sex
    let img = req.body.img
    let sqlStr = "insert into user(username,password,nickname,age,sex,img) value(?,?,?,?,?,?)"
    let result = await sqlQuery(sqlStr,[username,jiami(password),nickname,age,sex,img])
    if(result.length!=0){
        res.send({
            "msg":'用户信息提交成功'
        })
    }
}

let userUpdate = async(req,res)=>{
    let id =  req.body.id;
    let username = req.body.username
    let password = req.body.password
    let nickname = req.body.nickname
    let age = req.body.age
    let sex = req.body.sex
    let img = req.body.img
    //console.log(username)
    let sqlStr = "update user set username=?,password=?,nickname=?,age=?,sex=?,img=? where id=? "
    let result = await sqlQuery(sqlStr,[username,jiami(password),nickname,age,sex,img,id])
    if(result.length!=0){
        res.send({
            "code":200,
            "msg":'用户信息修改成功'
        })
    }
}



let userDelete = async(req,res)=>{
    let id =  req.body.id;
    //console.log(username)
    let sqlStr = "delete from user where id=? "
    let result = await sqlQuery(sqlStr,[id])
    if(result.length!=0){
        res.send({
            "code":200,
            "msg":'用户信息删除成功'
        })
    }
}


let userFind =async(req,res)=>{
    let secName = req.body.secName;
    console.log(secName);
    let sqlStr = "select * from user where nickname like \"%\"?\"%\" " 
    let result = await sqlQuery(sqlStr,secName)
    //console.log(result)
    if(result.length!=0){
        res.send({
            "data":result,
            "code":200,
            "msg":'用户信息查找成功'
        })
    }
}

module.exports = {
    userTable,userInsert,userUpdate,userDelete,getUserMeg,userFind
}
