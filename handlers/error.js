module.exports = {
  '404': function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  'development': function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  },
  'production': function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: 'err',
      error: JSON.stringify(err)
    });
  }
};
