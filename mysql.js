var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'devteammanager.chvzo3pl27ae.ap-northeast-2.rds.amazonaws.com',
  user     : 'qmit',
  password : 'qmitqmit',
  database : 'DEV_Dongkyu_Nodejs_Exam'
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
