const { json } = require('body-parser');
var crypto = require('crypto');
var sqlQuery = require('../util/dbconfig');

let getClass = async(req,res)=>{

    let sqlStr = "select * from getClass";
    let result = await sqlQuery(sqlStr);
    if(result.length!=0){
        res.send({
            "data":result
        })
    }
}

let mainContent = async(req,res)=>{
    let sqlStr = "select * from maincontent"
    let result = await sqlQuery(sqlStr)
    if(result.length!=0){
        res.send({
            "data":result
        })
    }
}

let getCollection = async (req,res)=>{
    let collectionList = req.body.collectionList
    //console.log(collectionList)
    let collectionArr=[]
    let result 
    for(let i=0; i<collectionList.length; i++) {
        //console.log(collectionList[i])
        let sqlStr = "select * from maincontent where docid = ? "
        result = await sqlQuery(sqlStr,collectionList[i])
        collectionArr.push(result)
    }
    if(collectionArr.length!=0) {
            res.send({
                "msg":"11",
                "data":collectionArr
            })
        }
    //console.log(collectionArr)
    // let test = "iznctkc7843066" 
    // let sqlStr = "select comments from maincontent where docid = ? "
    // res1 = sqlQuery(sqlStr,test)
    // console.log(res1)
    //console.log(result)
    
    //let sqlStr = "select * from maincontent where publishid = ? "
    //let result = sqlQuery(sqlStr,collectionList) 
    
    //console.log(result)
    // let sqlStr = "select * from maincontent where publishid = ? "
    // let result = sqlQuery(sqlStr,collectionList)
    // if(result.length!=0){
    //     res.send({
    //         "data":result,
    //     })
    // }
    
}


let getRead = async (req,res)=>{
    let readList = req.body.readList
    console.log(readList)
    let readArr=[]
    let result 
    for(let i=0; i<readList.length; i++) {
        console.log(readList[i])
        let sqlStr = "select * from maincontent where docid = ? "
        result = await sqlQuery(sqlStr,readList[i])
        readArr.push(result)
    }
    if(readArr.length!=0) {
            res.send({
                "msg":"11",
                "data":readArr
            })
        }
    console.log(readArr)
}


let pageContent = async(req,res)=>{
    let articleId = req.body.id;
    console.log(articleId);
    let sqlStr = "select * from pagecontent where publishid = ?"
    let result = await sqlQuery(sqlStr,[articleId])
    if(result.length!=0){
        res.send({
            "data":result
        })
    }
}


module.exports ={
    getClass,mainContent,pageContent,getCollection,getRead
}