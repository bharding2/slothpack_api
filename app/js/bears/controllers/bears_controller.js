var handleErr = require('../../lib').handleErr;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['$http', function($http) {
    this.bears = [];
    this.topTen = [];

    this.backup = (bear) => {
      bear.backup = angular.copy(bear);
    };

    this.restoreBackup = (bear) => {
      angular.copy(bear.backup, bear);
    };

    this.deleteBackup = (bear) => {
      delete bear.backup;
    };

    this.getAll = () => {
      $http.get(baseUrl + '/api/bears')
        .then((response) => {
          this.bears = response.data;
          this.topTen = this.bears.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          this.topTen.length = 10;
        }, handleErr.bind(this));
    };

    this.createBear = () => {
      $http.post(baseUrl + '/api/bears', this.newBear)
        .then((response) => {
          this.bears.push(response.data);
          this.newBear = null;
        }, handleErr.bind(this));
    };

    this.updateBear = (bear) => {
      $http.put(baseUrl + '/api/bears/' + bear._id, bear)
        .then(() => {
          bear.editing = false;
        }, handleErr.bind(this));
    };

    this.removeBear = (bear) => {
      $http.delete(baseUrl + '/api/bears/' + bear._id)
        .then(() => {
          this.bears.splice(this.bears.indexOf(bear), 1);
        }, handleErr.bind(this));
    };
  }]);
};
