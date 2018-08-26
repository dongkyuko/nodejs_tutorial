var url = require('url');
var qs = require('querystring');
var template = require('./template');
var db = require('./db');


//Home 화면
exports.home = function (request, response) {

  var title = "Welcome";

  //Join을 이용한 author 테이블과 topic 테이블 합치는 SQL
  //SELECT * FROM topic LEFT JOIN author ON topic.author_id==author.id WHERE topic.id=?;

  db.query(`SELECT * FROM topic`, function(error, topics){

    //에러 처리
    if (error) {
      throw error;
    }

    //파일리스트 추출
    list = template.List(topics);

    //본문 내용 가져오는 함수
    var html = template.HTML(title, list,
      `
      <h2>Welcome</h2>
      <p>Hello World</p>
      `,
    `<a href="/create">Create</a>`
      );

    response.writeHead(200);
    response.end(html);

  });
};


//상세보기 화면
exports.page = function (request, response) {

  //URL 정보 다 가져오기
  var _url = request.url;

  //URL에서 쿼리 스트링만 가져오기
  var queryData = url.parse(_url, true).query;

  //Join을 이용한 author 테이블과 topic 테이블 합치는 SQL
  //SELECT * FROM topic LEFT JOIN author ON topic.author_id==author.id WHERE topic.id=?;

  db.query(`SELECT * FROM topic`, function(error, topics){

    //에러 처리
    if (error) {
      throw error;
    }

    db.query("SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?",
              [queryData.id],function(error2, topic){
      //에러 처리
      if (error2) {
        throw error2;
      }

      //파일리스트 추출
      list = template.List(topics);

      //본문 내용 가져오는 함수
      var html = template.HTML(topic[0].title, list,
        `
        <h2>${topic[0].title}</h2>
        <p>${topic[0].description}</p>
        <p>by ${topic[0].name}</p>
        `,
        `<a href="/create">Create</a>
        <a href="update?id=${queryData.id}">Update</a>
        <form action="/delete_process" method="post">
          <input type="hidden" name="id" value="${queryData.id}">
          <input type="submit" value="Delete">
        </form>
        `);
      response.writeHead(200);
      response.end(html);
    });
  });
};

//Create 화면
exports.create = function (request, response) {

  //SELECT * FROM author;

  create_title = 'Create Content';

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

      //본문 내용 가져오는 함수
      var html = template.HTML(create_title, list,
        `
        <h2>${create_title}<h2>
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p>${template.authorSelect(authors)}</p>
          <p><input type="submit"></p>
        </form>
        `,
        '');

      response.writeHead(200);
      response.end(html);
    });
  });
};

//Create 구현
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

    db.query(`INSERT INTO topic (title, description, created, author_id)
            VALUES (?, ?, NOW(), ?)`, [post.title, post.description, post.author], function(error, result) {

        if(error){
        throw error;
        }

      //Head에 302 쓰고 쓴 글로 이동
      response.writeHead(302, {Location: `/?id=${result.insertId}`});
      response.end();
    });
  });
};

//Update 화면
exports.update = function (request, response) {

  //URL 정보 다 가져오기
  var _url = request.url;

  //URL에서 쿼리 스트링만 가져오기
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM topic`, function(error, topics){

    //에러 처리
    if (error) {
      throw error;
    }

    db.query("SELECT * FROM topic WHERE id=?",[queryData.id],function(error2, topic){
      //에러 처리
      if (error2) {
        throw error2;
      }

      db.query(`SELECT * FROM author`, function(error3, authors){

        //에러 처리
        if (error3) {
          throw error3;
        }

        //제목
        title = 'Update Content';

        //파일리스트 추출
        list = template.List(topics);

        //본문 내용 가져오는 함수
        var html = template.HTML(title, list,
          `
          <form class="" action="/update_process" method="post">
          <p><input type="hidden" name="id" value="${topic[0].id}"></p>
          <p><input type="text" name="title" value="${topic[0].title}" placeholder="Title"></p>
          <p><textarea name="description" placeholder="Description" rows="8" cols="80">${topic[0].description}</textarea></p>
          <p>${template.authorSelect(authors, topic[0].author_id)}</p>
          <p><input type="submit" name="" value="Submit"></p>
          </form>
          `,
          `
          <a href="/create">Create</a>
          <a href="update?id=${topic[0].id}">Update</a>
          `);

        response.writeHead(200);
        response.end(html);
      });
    });
  });
};

//Update 구현
exports.update_process = function (request, response) {
  //UPDATE SQL문
  //UPDATE topic SET title = ?, description =? WHERE id=?;

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

    //UPDATE 하기
    db.query(`UPDATE topic SET title=?, description =?, author_id=? WHERE id=?`,
            [post.title, post.description, post.author, post.id], function(error, result) {

        if(error){
        throw error;
        }

        //Head에 302 쓰고 쓴 글로 이동
        response.writeHead(302, {Location: `/?id=${post.id}`});
        response.end();
    });
  });
};

//Delete 구현
exports.delete_process = function (request, response) {
  //Delete SQL문
  //DELETE FROM topic WHERE id=?

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

    //Delete 하기
    db.query(`DELETE FROM topic WHERE id=?`, [post.id], function(error, result) {

        if(error){
        throw error;
        }

        //Head에 302 쓰고 쓴 글로 이동
        response.writeHead(302, {Location: `/`});
        response.end();
    });
  });
};
