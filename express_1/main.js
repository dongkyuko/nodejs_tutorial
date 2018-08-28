var express = require('express');
var app = express();

//미들웨어
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

//라우터
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');


// 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

//정적인 파일 설정
app.use('/static', express.static(__dirname + '/public'));

//라우터
app.use('/', indexRouter);
app.use('/topic', topicRouter);

//페이지가 없을때
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

//err 핸들링
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});
