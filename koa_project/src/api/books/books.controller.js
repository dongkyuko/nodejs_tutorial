const Book = require('models/book');

//데이터 하나만 가져오기
exports.get = async (ctx) => {
    
    const { id } = ctx.params; //URL 파라미터에서 id 값을 읽어옴

    let book;

    try {
        book = await Book.findById(id).exec();
    } catch(e) {
        console.log(e);
        if(e.name === 'CastError') {
            ctx.status = 400;
            return
        }
        //HTTP 상태 500와 Internal Error 라는 메시지를 반환하고 에러를 기록합니다.
        return ctx.throw(500, e);
    }

    if(!book) {
        //데이터가 존재하지 않으면
        ctx.status = 404;
        ctx.body = {message: 'book not found'};
        return;
    }
    
    ctx.body = book;
}

//데이터 목록 가져오기
exports.list = async (ctx) => {
    
    let books;

    try {
        //데이터를 조회
        //.exec()를 뒤에 붙여줘야 실제로 데이터베이스에 요청
        //반환값은 Promise 이므로 await를 사용할 수 있음
        books = await Book.find()
                .sort({id: -1}) // id의 역순으로 정렬
                .limit(3) // 3개만 보이도록 설정
                .exec(); // 데이터를 서버에 요청
    } catch(e) {
        //HTTP 상태 500와 Internal Error 라는 메시지를 반환하고 에러를 기록합니다.
        return ctx.throw(500, e);
    }
    
    ctx.body = books;
}
//데이터 입력하기
exports.create = async (ctx) => {
    
    //request body 에서 값들을 추출
    const {
        title,
        authors,
        publishedDate,
        price,
        tags
    } = ctx.request.body;
    
    //Book 인스턴스를 생성
    const book = new Book({
        title,
        authors,
        publishedDate,
        price,
        tags
    })

    //만들어진 Book 인스턴스를, 이렇게 수정할 수도  있습니다.
    //book.title = title;

    //.save()함수를 실행하면 이 때 데이터베이스에 실제로 데이터를 작성합니다.
    // Promise 를 반환합니다.

    try {
        await book.save();
    } catch(e) {
        //HTTP 상태 500와 Internal Error 라는 메시지를 반환하고 에러를 기록합니다.
        return ctx.throw(500, e);
    }
    
    //저장한 결과를 반환
    ctx.body = book;
}

exports.delete = (ctx) => {
    ctx.body = "deleted";
}

exports.replace = (ctx) => {
    ctx.body = "replaced";
}

exports.update = (ctx) => {
    ctx.body = "updated";
}
