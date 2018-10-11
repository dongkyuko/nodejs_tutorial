const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');

//데이터 리스트 가져오기
books.get ('/', booksCtrl.list);

//데이터 하나만 가져오기
books.get('/:id', booksCtrl.get);

//데이터 만들기
books.post ('/', booksCtrl.create);

books.delete ('/', booksCtrl.delete);

books.put ('/', booksCtrl.replace);

books.patch ('/', booksCtrl.update);

module.exports = books;