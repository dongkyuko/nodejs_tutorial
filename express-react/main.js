var express = require('express');
var app = express();
var user = require('./router/user');
//로깅 미들웨어
var morgan = require('morgan');
//Json 형태 데이터 파싱
var bodyParser = require('body-parser');

//미들웨어 실행
app.use(morgan('dev'));
app.use(bodyParser.json());
//정적(static) 파일 제공
app.use('/static', express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.use('/user', user);

app.listen(3000, function(){
    console.log('3000번 포트 열림');    
});