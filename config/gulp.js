module.exports = {
  'sass': {
    'src': './public/style/sass/**/*.scss',
    'dest': './public/style/css/'
  },
  'nodemon': {
    'verbose': true,
    'ignore': [
      '.git*',
      'node_modules/**/node_modules',
      'test.js',
      'public/*',
      'filelog.info.log'
    ],
    'ext': 'js, json, html'
  },
};
