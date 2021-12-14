var express = require('express');
var router = express.Router();

//引入连接数据库模块
const connection = require('./conn')

//连接数据
connection.connect(() => { })

/*获取列表*/
router.post('/list', (req, res) => {
  const sqlStr = 'select * from member'
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
});
//会员登记
router.post('/addMember', function (req, res) {
  const sqlStr = 'insert into member(memberName,memberSex,memberAge,phone,memberNum,memberAddr) values (?,?,?,?,?,?)';
  var params = req.body
  connection.query(sqlStr, [params.memberName, params.memberSex, params.memberAge, params.phone, params.memberNum, params.memberAddr], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
});


module.exports = router;