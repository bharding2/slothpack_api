var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'sbHandleError', 'sbAuth',
  function($http, $location, sbHandleError, sbAuth) {
    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          sbAuth.saveToken(res.data.token);
          sbAuth.getUsername();
          $location.path('/bears');
        }, sbHandleError(this.errors, 'could not sign into user'));
    };
  }]);
};
