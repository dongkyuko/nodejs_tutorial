module.exports = {

    //템플릿 함수
    HTML:function(title, list, description, control){
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <a href ="/author">Author</a>
        ${list}
        ${control}
        ${description}
      </body>
      </html>
      `;
    },

    //파일리스트 추출 함수
    List:function(topics) {

      var list = '<ul>';
      i = 0;

      while (i < topics.length) {
        list = list + `<li> <a href="/?id=${topics[i].id}"> ${topics[i].title} </a> </li>`;
        i = i + 1;
        }

        list = list + '</ul>';

        return list;
    },

    //저자 선택 박스
    authorSelect:function(author, author_id){
      //option 박스 생성
      var tag ='';
      var i = 0;

      while (i < author.length) {

        var selected = '';

        if(author[i].id === author_id){
          var selected = ' selected';
        }

        tag  +=  `<option value="${author[i].id}" ${selected}>${author[i].name}</option>`;
        i++;

      }
      
      return `<select name='author'>${tag}</select>`;
    },
};
