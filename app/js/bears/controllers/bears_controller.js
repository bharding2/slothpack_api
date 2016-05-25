var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['$http', 'sbHandleError', 'sbTopTen',
  function($http, sbHandleError, sbTopTen) {
    this.bears = [];
    this.topTen = [];
    this.errors = [];

    this.backup = (bear) => {
      bear.backup = angular.copy(bear);
    };

    this.restoreBackup = (bear) => {
      angular.copy(bear.backup, bear);
    };

    this.deleteBackup = (bear) => {
      delete bear.backup;
    };

    this.getAll = function() {
      $http.get(baseUrl + '/api/bears')
        .then((response) => {
          this.bears = response.data;
          this.topTen = sbTopTen(this.bears);
        }, sbHandleError(this.errors, 'could not retrieve bears'));
    }.bind(this);

    this.createBear = function() {
      var bearName = this.newBear.name;
      $http.post(baseUrl + '/api/bears', this.newBear)
        .then((response) => {
          this.bears.push(response.data);
          this.newBear = null;
          this.topTen = sbTopTen(this.bears);
        }, sbHandleError(this.errors, 'could not create bear ' + bearName));
    }.bind(this);

    this.updateBear = function(bear) {
      $http.put(baseUrl + '/api/bears/' + bear._id, bear)
        .then(() => {
          bear.editing = false;
        }, sbHandleError(this.errors, 'could not update bear ' + bear.name));
    }.bind(this);

    this.removeBear = function(bear) {
      $http.delete(baseUrl + '/api/bears/' + bear._id)
        .then(() => {
          this.bears.splice(this.bears.indexOf(bear), 1);
          this.topTen = sbTopTen(this.bears);
        }, sbHandleError(this.errors, 'could not remove bear ' + bear.name));
    }.bind(this);
  }]);
};
