module.exports = function(app) {
  app.controller('AuthController', ['sbAuth', 'sbHandleError', '$location',
  function(sbAuth, sbHandleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      sbAuth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, sbHandleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      sbAuth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
