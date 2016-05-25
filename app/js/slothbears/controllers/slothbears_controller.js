var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothbearsController', ['$http', 'sbHandleError',
  function($http, sbHandleError) {
    this.slothbears = [];
    this.errors = [];

    this.backup = (slothbear) => {
      slothbear.backup = angular.copy(slothbear);
    };

    this.restoreBackup = (slothbear) => {
      angular.copy(slothbear.backup, slothbear);
    };

    this.deleteBackup = (slothbear) => {
      delete slothbear.backup;
    };

    this.getAll = function() {
      $http.get(baseUrl + '/api/slothbears')
        .then((response) => {
          this.slothbears = response.data;
        }, sbHandleError(this.errors, 'could not retrieve slothbears'));
    }.bind(this);

    this.createSlothbear = function() {
      $http.get(baseUrl + '/api/mate')
        .then((response) => {
          this.slothbears.push(response.data);
        }, sbHandleError(this.errors, 'could not create slothbear'));
    }.bind(this);

    this.updateSlothbear = function(slothbear) {
      $http.put(baseUrl + '/api/slothbears/' + slothbear._id, slothbear)
        .then(() => {
          slothbear.editing = false;
        }, sbHandleError(this.errors, 'could not update slothbear ' + slothbear.name));
    }.bind(this);

    this.removeSlothbear = function(slothbear) {
      $http.delete(baseUrl + '/api/slothbears/' + slothbear._id)
        .then(() => {
          this.slothbears.splice(this.slothbears.indexOf(slothbear), 1);
        }, sbHandleError(this.errors, 'could not remove slothbear ' + slothbear.name));
    }.bind(this);
  }]);
};
