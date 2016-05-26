var Absence = require('../../models/absences').Absence;
var templates = require('../../config/templates');
var messages = require('../../config/messages');
module.exports = {
  get: function(req, res, next) {
    Absence.find(function(err, absences) {
      if (err) return next(err);
      return res.render(templates.admin.absences, { absences: absences });
    });
  },
  'id': {
    get: function(req, res, next) {
      Absence.findById(req.params.id, function(err, absence) {
        if (err) return next(err);
        if(!absence) return next(messages.admin.absence.notfound);
        return res.render(templates.admin.absence, {absence:absence});
      });
    },
    post:function(req,res){
      if(req.user && req.user.type == 'Admin' && req.isAuthenticated()){

      }else{
        res.send({
          success:false,
          message:'You are not an administrator',
          redirect:'/logout'
        });
      }
    }
  },
};
