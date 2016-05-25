var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothsController', ['$http', 'sbHandleError', function($http, sbHandleError) {
    this.sloths = [];
    this.topTen = [];
    this.errors = [];

    this.backup = (sloth) => {
      sloth.backup = angular.copy(sloth);
    };

    this.restoreBackup = (sloth) => {
      angular.copy(sloth.backup, sloth);
    };

    this.deleteBackup = (sloth) => {
      delete sloth.backup;
    };

    this.getAll = function() {
      $http.get(baseUrl + '/api/sloths')
        .then((response) => {
          this.sloths = response.data;
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
        }, sbHandleError(this.errors, 'could not retrieve sloths'));
    }.bind(this);

    this.createSloth = function() {
      var slothName = this.newSloth.name;
      $http.post(baseUrl + '/api/sloths', this.newSloth)
        .then((response) => {
          this.sloths.push(response.data);
          this.newSloth = null;
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
        }, sbHandleError(this.errors, 'could not create sloth ' + slothName));
    }.bind(this);

    this.updateSloth = function(sloth) {
      $http.put(baseUrl + '/api/sloths/' + sloth._id, sloth)
        .then(() => {
          sloth.editing = false;
        }, sbHandleError(this.errors, 'could not update sloth ' + sloth.name));
    }.bind(this);

    this.removeSloth = function(sloth) {
      $http.delete(baseUrl + '/api/sloths/' + sloth._id)
        .then(() => {
          this.sloths.splice(this.sloths.indexOf(sloth), 1);
          this.topTen = this.sloths.slice()
            .sort((a, b) => {
              return b.offspring.length - a.offspring.length;
            });
          if (this.topTen.length > 10) this.topTen.length = 10;
        }, sbHandleError(this.errors, 'could not remove sloth ' + sloth.name));
    }.bind(this);
  }]);
};
