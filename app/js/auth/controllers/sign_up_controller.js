var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', 'sbHandleError', 'sbAuth',
  function($http, $location, sbHandleError, sbAuth) {
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User';
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          sbAuth.saveToken(res.data.token);
          sbAuth.getUsername();
          $location.path('/bears');
        }, sbHandleError(this.errors, 'Could not create user'));
    };
  }]);
};
