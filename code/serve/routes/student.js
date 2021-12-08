var express = require('express');
var router = express.Router();

//引入连接数据库模块
const connection=require('./conn')

//连接数据
connection.connect(()=>{})

/*接受登录请求*/
router.post('/list', (req, res)=> {
    const sqlStr='select * from student'
    connection.query(sqlStr,(err,data) =>{
            if(err){
              throw err;
            }else{
              res.send(data)
            }
    })
  });
  
  

module.exports = router;
