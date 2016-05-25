var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothsController', ['$http', function($http) {
    this.sloths = [];
    this.topTen = [];

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
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
        }, handleErr.bind(this));
    };

    this.createSloth = () => {
      $http.post(baseUrl + '/api/sloths', this.newSloth)
        .then((response) => {
          this.sloths.push(response.data);
          this.newSloth = null;
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
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
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
        }, handleErr.bind(this));
    };
  }]);
};
