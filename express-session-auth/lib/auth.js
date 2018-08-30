module.exports ={

  isOwner:function(request, response) {
    if(request.user){
      return true;
    } else {
      return false;
    }
  },

  statusUI:function(request, response){
    var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>';
    if (this.isOwner(request, response)) {
      authStatusUI = `<p> ${request.user.displayname} | <a href="/auth/logout">logout</a></p>`;
    }
    return authStatusUI;
  },
};
