var url = require('url');
var qs = require('querystring');
var template = require('./template');
var db = require('./db');

//Author_Home 화면
exports.home = function (request, response) {

  //URL 정보 다 가져오기
  var _url = request.url;

  //URL에서 쿼리 스트링만 가져오기
  var queryData = url.parse(_url, true).query;

  var title = "Author";

  db.query(`SELECT * FROM topic`, function(error, topics){

    //에러 처리
    if (error) {
      throw error;
    }

    db.query(`SELECT * FROM author`, function(error2, authors){

      //에러 처리
      if (error2) {
        throw error2;
      }

      //파일리스트 추출
      list = template.List(topics);

      //author 리스트 불러오기
      var authorList = template.authorHome(authors);

      //본문 내용 가져오는 함수
      var html = template.HTML(title, list,
        `
        <h2>Author List</h2>
        ${authorList}
        `,""
        );

      response.writeHead(200);
      response.end(html);

    });
  });
};

//Author_Create 구현
exports.create_process = function (request, response) {

  // 입력 SQL문
  //INSERT INTO topic (title, description, created, author_id) VALUES ('NodeJS', 'ModeJS is..', NOW(), 1);

  // body 변수 초기화
  var body = '';

  // post 데이터가 너무 크면 접속 종료
  request.on('data', function (data) {
    body = body + data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });

  // post 데이터 처리
  request.on('end', function () {

    //POST 데이터 저장
    var post = qs.parse(body);

    db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,
              [post.name, post.profile], function(error, result) {

        if(error){
        throw error;
      }

      //Head에 302 쓰고 쓴 글로 이동
      response.writeHead(302, {Location: `/author`});
      response.end();
    });
  });
};

//Author_update 화면
exports.update = function (request, response) {

  // 입력 SQL문
  //INSERT INTO topic (title, description, created, author_id) VALUES ('NodeJS', 'ModeJS is..', NOW(), 1);

  // body 변수 초기화
  var body = '';

  // post 데이터가 너무 크면 접속 종료
  request.on('data', function (data) {
    body = body + data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });

  // post 데이터 처리
  request.on('end', function () {

    //POST 데이터 저장
    var post = qs.parse(body);

    // db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,
    //           [post.name, post.profile], function(error, result) {
    //
    //     if(error){
    //     throw error;
    //   }

      //Head에 302 쓰고 쓴 글로 이동
      response.writeHead(302, {Location: `/author`});
      response.end();
    });
  //});
};

//Author_update 구현
exports.update_process = function (request, response) {

  // 입력 SQL문
  //INSERT INTO topic (title, description, created, author_id) VALUES ('NodeJS', 'ModeJS is..', NOW(), 1);

  //Parse
  // body 변수 초기화
  var body = '';

  // post 데이터가 너무 크면 접속 종료
  request.on('data', function (data) {
    body = body + data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });

  // post 데이터 처리
  request.on('end', function () {

    //POST 데이터 저장
    var post = qs.parse(body);

    // db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,
    //           [post.name, post.profile], function(error, result) {
    //
    //     if(error){
    //     throw error;
    //   }

      //Head에 302 쓰고 쓴 글로 이동
      response.writeHead(302, {Location: `/author`});
      response.end();
    });
  //});
};
