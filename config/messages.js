module.exports = {
  'register':{
    'success':{
      success:true
    },
    failed:function(message){
      return {
        success:false,
        message:message || 'Username and password do not match'
      };
    }
  },
  'login':{
    'success':{
      success:true
    },
    failed:function(message){
      return {
        success:false,
        message:message || 'Username and password do not match'
      };
    }
  },
  'logout':{
    'post':{
      success:true,
      message:'Logged out!'
    }
  }
};
