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
      'create': 'index',
      'view': 'index',
      'list': 'history',
    },
  },
  'teachers': {
    'index': 'index',
    'pending_requests': 'index',
    'absences': 'absences'
  }
};
