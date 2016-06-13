module.exports = {
  'index': 'index',
  'logout': 'index',
  'admin': {
    'index': 'admin/index',
    'absences': 'admin/absences',
    'earlyexcuses': 'admin/earlyexcuses',
    'history': 'admin/history',
    'students': 'admin/students',
    'absence': {
      'pending': 'admin/pending/absence',
    },
    'earlyexcuse': {
      'pending': 'admin/pending/earlyexcuse',
    }
  },
  'students': {
    'index': 'student/index',
    'history': 'student/history',
    'profile': 'student/profile',
    'absence': {
      'create': 'student/create/absence',
      'view': 'student/view/absence'
    },
    'earlyexcuse': {
      'create': 'student/create/earlyexcuse',
      'view': 'student/view/earlyexcuse'
    },
  },
  'teachers': {
    'index': 'teacher/index',
    'pending_requests': 'teacher/pending',
    'history': 'teacher/history',
    'absence': {
      'view': 'teacher/view/absence',
      'pending': 'teacher/pending/absence'
    },
    'earlyexcuse': {
      'view': 'teacher/view/earlyexcuse',
      'pending': 'teacher/pending/earlyexcuse'
    }
  }
};
