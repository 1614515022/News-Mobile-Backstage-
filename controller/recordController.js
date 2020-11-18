const { json } = require('body-parser');
var crypto = require('crypto');
var sqlQuery = require('../util/dbconfig');



// let collection = async (req,res)=>{
//     let userId = req.params.id;
//     let collection = req.body.collection
//     console.log(collection);
//     let sqlStr = "select collection from user where id =?"
//     let result = await sqlQuery(sqlStr,userId)
    
//     if(result.indexOf(collection)==-1){
//         let sqlStr = "update user set collection= where id=?"
//          await sqlQuery(sqlStr,[mySet,userId])
//         res.send({
//             "msg":"收藏成功",
            
//         })
//     }else{
//         res.send({
//             "msg":"取消收藏成功"
//         })
//     }
// }

module.exports = {
    
}