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
      ${description}
      ${control}
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

  //저자 리스트
  authorHome:function(authors){

    //리스트 변수 선언
    var authorList = `<table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Profile</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    `;

    //Table 생성
    for (i = 0;  i < authors.length; i++){
      //console.log(authors[i]);å
      authorList = authorList + "<tr>";
      for ( var authorsValue in authors[i] ){
        if (authorsValue === 'id') {}
        else {authorList += "<td>" + authors[i][authorsValue] + "</td>";}
      }
      authorList = authorList + `
      <td>
        <a href="/author/update?id=${authors[i].id}">Update</a>
      </td>
      <td>
      <form action="/author/delete_process" method="post">
        <input type="hidden" name="id" value="${authors[i].id}">
        <input type="submit" value="Delete">
      </form>
      </td>
      </tr>
      `;
    }

    //HTML 추가
    authorList = authorList + `</table>`;

    return authorList;
  },

};
