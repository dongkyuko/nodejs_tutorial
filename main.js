//모듈 호출
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

//서버 생성 함수
var app = http.createServer(function(request,response){

    //URL 정보 다 가져오기
    var _url = request.url;
    //URL에서 쿼리 스트링만 가져오기
    var queryData = url.parse(_url, true).query;
    //URL 경로 가져오기
    var pathname = url.parse(_url, true).pathname;

    //경로가 / 일때
    if(pathname === '/'){
      if (queryData.id === undefined){
        //Home 화면
        topic.home(request, response);
      } else {
        //상세보기 화면
        topic.page(request, response);
      }
    }
    //경로가 create일때
    else if (pathname === '/create') {
      topic.create(request, response);
    }
    //글 쓰기 기능 구현
    else if (pathname === '/create_process') {
      topic.create_process(request, response);
    }
    //경로가 Update일 때
    else if (pathname === '/update') {
      topic.update(request, response);
    }
    //update 기능 구현
    else if (pathname === '/update_process') {
      topic.update_process(request, response);
    }
    //Delete 기능 구현
    else if (pathname === '/delete_process') {
      topic.delete_process(request, response);
    }
    //author 화면
    else if (pathname === '/author') {
      author.home(request, response);
    }
    //author Create 구현
    else if (pathname === '/author/create_process') {
      author.create_process(request, response);
    }
    //author Update 화면
    else if (pathname === '/author/update') {
      author.update(request, response);
    }
    //author Update 구현
    else if (pathname === '/author/update_process') {
      author.update_process(request, response);
    }
    //페이지가 없을때
    else {
      response.writeHead(404);
      response.end('Not found');
    }
  });
//3000번 포트로 서버 생성
app.listen(3000);
