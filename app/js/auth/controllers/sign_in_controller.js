var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'sbHandleError',
  function($http, $location, sbHandleError) {
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
          window.localStorage.token = res.data.token;
          $location.path('/bears');
        }, sbHandleError(this.errors, 'could not sign into user'));
    };
  }]);
};
