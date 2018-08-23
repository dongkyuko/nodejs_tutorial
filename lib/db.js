var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'devteammanager.chvzo3pl27ae.ap-northeast-2.rds.amazonaws.com',
  user     : 'qmit',
  password : 'qmitqmit',
  database : 'DEV_Dongkyu_Nodejs_Exam'
});

db.connect();

module.exports = db;
