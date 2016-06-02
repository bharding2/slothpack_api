var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothsController', ['sbRest', 'sbTopTen', function(Rest, sbTopTen) {
    this.topTen = sbTopTen;
    this.sloths = [];
    sbTopTen.sloths = this.sloths;
    this.errors = [];
    this.restApi = new Rest(this.sloths, this.errors, baseUrl + '/api/sloths');

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
      this.restApi.getAll()
        .then(() => {
          sbTopTen.getTopTenSloths();
        });
    }.bind(this);

    this.createSloth = function() {
      this.restApi.create(this.newSloth)
        .then(() => {
          this.newSloth = null;
          sbTopTen.getTopTenSloths();
        });
    }.bind(this);

    this.updateSloth = function(sloth) {
      this.restApi.update(sloth)
        .then(() => {
          sloth.editing = false;
        });
    }.bind(this);

    this.removeSloth = function(sloth) {
      this.restApi.remove(sloth)
        .then(() => {
          this.sloths = this.restApi.data;
          sbTopTen.getTopTenSloths();
        });
    }.bind(this);

    this.getAll();
  }]);
};
