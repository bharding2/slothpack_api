var handleErr = require('../../lib').handleErr;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothsController', ['$http', function($http) {
    this.sloths = [];

    this.backup = (sloth) => {
      sloth.backup = angular.copy(sloth);
    };

    this.restoreBackup = (sloth) => {
      angular.copy(sloth.backup, sloth);
    };

    this.deleteBackup = (sloth) => {
      delete sloth.backup;
    };

    this.getAll = () => {
      $http.get(baseUrl + '/api/sloths')
        .then((response) => {
          this.sloths = response.data;
        }, handleErr.bind(this));
    };

    this.createSloth = () => {
      $http.post(baseUrl + '/api/sloths', this.newSloth)
        .then((response) => {
          this.sloths.push(response.data);
          this.newSloth = null;
        }, handleErr.bind(this));
    };

    this.updateSloth = (sloth) => {
      $http.put(baseUrl + '/api/sloths/' + sloth._id, sloth)
        .then(() => {
          sloth.editing = false;
        }, handleErr.bind(this));
    };

    this.removeSloth = (sloth) => {
      $http.delete(baseUrl + '/api/sloths/' + sloth._id)
        .then(() => {
          this.sloths.splice(this.sloths.indexOf(sloth), 1);
        }, handleErr.bind(this));
    };
  }]);
};
