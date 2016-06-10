module.exports = {
  'index': 'index',
  'logout': 'index',
  'admin': {
    'index': 'admin',
    'absences': 'masterabsence',
    'absence': 'index'
  },
  'students': {
    'index': 'student',
    'history': 'history',
    'profile': 'profile',
    'absence': {
      'create': 'absence',
      'view': 'viewabsence',
      'list': 'history'
    },
    'earlyexcuse': {
      'create': 'earlyexcuse',
      'view': 'index',
      'list': 'history',
    },
  },
  'teachers': {
    'index': 'teacher',
    'pending_requests': 'index',
    'absences': 'teacherabsences'
  }
};
