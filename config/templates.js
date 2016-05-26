module.exports = {
  'index': 'index',
  'logout': 'index',
  'admin': {
    'index': 'admin',
    'absences': 'index',
    'absence': 'index'
  },
  'students': {
    'index': 'student',
    'absences': 'index',
    'absence': {
      'create': 'absence',
      'view': 'index',
    },
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
