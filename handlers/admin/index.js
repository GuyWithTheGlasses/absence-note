var template = require('../../config/templates');
module.exports = {
  'absences':{
    get:function(req,res){
      res.render(templates.admin.absences);
    },
    post:function(req,res){
      res.send('/absences posted');
    },
    'id':{
      get:function(req, res){
        res.send('/absences/id posted with ' + req.params.id);
      },
      post:function(req,res){
        res.send('/absences/id posted with ' + req.params.id);
      }
    }
  }
};
