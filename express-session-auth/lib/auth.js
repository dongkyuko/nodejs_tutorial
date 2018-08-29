module.exports ={

  isOwner:function(request, response) {
    if(request.session.is_logined){
      return true;
    } else {
      return false;
    }
  },

  statusUI:function(request, response){
    var authStatusUI = '<a href="/auth/login">login</a>';
    if (this.isOwner(request, response)) {
      authStatusUI = `<p> ${request.session.nickname} | <a href="/auth/logout">logout</a></p>`;
    }
    return authStatusUI;
  },
};
