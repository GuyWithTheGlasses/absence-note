module.exports = {
  'teachers': {
    'absences': {
      'noPermissions': 'You do not have access to this absence',
      'approved': {
        success: true,
        message: "Absence approved!"
      },
      'denied':{
        success:true,
        message: "Absence denied!"
      }
    }
  },
  'admin': {
    'absence': {
      'notfound': 'The absence you were trying to access cannot be found',
      'approved': {
        success: true,
        message: 'Absence approved!'
      }
    }
  },
  'student': {
    'absence': {
      'noMatch': {
        err: true,
        message: 'OSIS does not match OSIS on note'
      },
      'created': function(note) {
        return {
          success: true,
          note: note
        };
      }
    },
    'profile': {
      'edit_success': function(student) {
        return {
          success: true,
          message: 'Updated!',
          student: student
        };
      },
      edit_fail: function(err) {
        return {
          success: false,
          message: err
        };
      }
    }
  }
};
