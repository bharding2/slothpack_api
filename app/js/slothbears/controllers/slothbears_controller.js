var handleErr = require('../../lib').handleErr;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothbearsController', ['$http', function($http) {
    this.slothbears = [];
    this.topTen = [];

    this.backup = (slothbear) => {
      slothbear.backup = angular.copy(slothbear);
    };

    this.restoreBackup = (slothbear) => {
      angular.copy(slothbear.backup, slothbear);
    };

    this.deleteBackup = (slothbear) => {
      delete slothbear.backup;
    };

    this.getAll = () => {
      $http.get(baseUrl + '/api/slothbears')
        .then((response) => {
          this.slothbears = response.data;
          this.topTen = this.slothbears.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          this.topTen.length = 10;
        }, handleErr.bind(this));
    };

    this.createSlothbear = () => {
      $http.get(baseUrl + '/api/mate')
        .then((response) => {
          this.slothbears.push(response.data);
        }, handleErr.bind(this));
    };

    this.updateSlothbear = (slothbear) => {
      $http.put(baseUrl + '/api/slothbears/' + slothbear._id, slothbear)
        .then(() => {
          slothbear.editing = false;
        }, handleErr.bind(this));
    };

    this.removeSlothbear = (slothbear) => {
      $http.delete(baseUrl + '/api/slothbears/' + slothbear._id)
        .then(() => {
          this.slothbears.splice(this.slothbears.indexOf(slothbear), 1);
        }, handleErr.bind(this));
    };
  }]);
};
