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
    'absence': {
      'create': 'absence',
      'view': 'viewabsence',
    },
    'history': 'history',
    'earlyexcusenote': 'earlyexcuse',
    'earlyexcuseform': 'earlyexcuse',
    'createearlyexcuse': 'earlyexcuse',
    'viewearlyexcuse': 'earlyexcuse',
    'profile': 'profile'
  },
  'teachers': {
    'index': 'teacher',
  }
};
