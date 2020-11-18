const { json } = require('body-parser');
var crypto = require('crypto');
var sqlQuery = require('../util/dbconfig');


let newsUpdate = async(req,res)=>{
    let docid = req.body.docid;
    let content = req.body.content;
    let nets = req.body.nets;
    let comments =req.body.comments;
    let mainContent = req.body.mainContent;
    let photo = req.body.photo;
    console.log(comments);
    let sqlStr = "update maincontent set content=?,nets=?,comments=?,mainContent=?,photo=? where docid=?"
    let result = await sqlQuery(sqlStr,[content,nets,comments,mainContent,photo,docid])
    if(result.length!=0){
        res.send({
            "code":200,
            "msg":'用户信息修改成功'
        })
    }
}


let newsInsert = async(req,res)=>{
    let docid = req.params.docid;
    let content = req.body.content;
    let nets = req.body.nets;
    let comments =req.body.comments;
    let mainContent = req.body.mainContent;
    let time = req.body.time;
    let photo = req.body.photo;
    let sqlStr = "insert into maincontent(docid,content,nets,comments,mainContent,photo,time) value(?,?,?,?,?,?,?)"
    let result = await sqlQuery(sqlStr,[docid,content,nets,comments,mainContent,photo,time])
    if(result.length!=0){
        res.send({
            "msg":'用户信息提交成功'
        })
    }
}


let newsDelete = async(req,res)=>{
    let docid =  req.body.docid;
    //console.log(username)
    let sqlStr = "delete from maincontent where docid=? "
    let result = await sqlQuery(sqlStr,[docid])
    if(result.length!=0){
        res.send({
            "code":200,
            "msg":'用户信息删除成功'
        })
    }
}


let newsFind = async(req,res)=>{
    let secName = req.body.secName;
    //console.log(secName);
    let sqlStr = "select * from maincontent where content like \"%\"?\"%\" "
    let result = await sqlQuery(sqlStr,secName)
    //console.log(result)
    if(result.length!=0){
        res.send({
            "code":200,
            "msg":"新闻查询成功",
            "data":result
        })
    }
}

module.exports = {
    newsUpdate,newsInsert,newsDelete,newsFind
}