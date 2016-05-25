module.exports = function(app) {
  require('./sb_handle_error')(app);
  require('./sb_top_ten')(app);
};
