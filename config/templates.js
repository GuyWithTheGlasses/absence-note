module.exports = {
  'index': 'index',
  'logout': 'index',
  'admin': {
    'index': 'admin',
    'absences': 'masterabsence',
    'earlyexcuses': 'masterearlyexcuse',
    'history': 'masterhistory',
    'students': 'masterstudents',
    'absence': 'adminabsence',
    'earlyexcuse': 'adminearlyexcuse',
    'historyabsence': 'historyabsence',
    'historyearlyexcuse': 'histoaryearlyexcuse'
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
      'view': 'viewearlyexcuse',
      'list': 'history',
    },
  },
  'teachers': {
    'index': 'teacher',
    'pending_requests': 'teacherpending',
    'absences': 'teacherabsences',
    'absence': 'teacherabsence',
    'earlyexcuse': 'teacherearlyexcuse',
    'pending_absence': 'pendingteacherabsence',
    'pending_earlyexcuse': 'pendingteacherearlyexcuse'
  }
};