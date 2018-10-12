const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');

//데이터 리스트 가져오기
books.get ('/', booksCtrl.list);

//데이터 하나만 가져오기
books.get('/:id', booksCtrl.get);

//데이터 만들기
books.post ('/', booksCtrl.create);

//데이터 지우기
books.delete ('/:id', booksCtrl.delete);

//Replace
books.put ('/:id', booksCtrl.replace);

//수정
books.patch ('/:id', booksCtrl.update);

module.exports = books;