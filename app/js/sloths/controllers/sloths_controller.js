var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothsController', ['sbRest', 'sbTopTen', function(Rest, sbTopTen) {
    this.sloths = [];
    this.topTen = [];
    this.errors = [];
    var restApi = new Rest(this.sloths, this.errors, baseUrl + '/api/sloths');

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
      restApi.getAll()
        .then(() => {
          this.topTen = sbTopTen(this.sloths);
        });
    }.bind(this);

    this.createSloth = function() {
      restApi.create(this.newSloth)
        .then(() => {
          this.newSloth = null;
          this.topTen = sbTopTen(this.sloths);
        });
    }.bind(this);

    this.updateSloth = function(sloth) {
      restApi.update(sloth)
        .then(() => {
          sloth.editing = false;
        });
    };

    this.removeSloth = function(sloth) {
      restApi.remove(sloth)
        .then(() => {
          this.sloths.splice(this.sloths.indexOf(sloth), 1);
          this.topTen = sbTopTen(this.sloths);
        });
    }.bind(this);
  }]);
};
