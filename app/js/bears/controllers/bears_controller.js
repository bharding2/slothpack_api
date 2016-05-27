var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['sbRest', 'sbTopTen', function(Rest, sbTopTen) {
    this.topTen = sbTopTen;
    this.bears = [];
    this.topTen.bears = this.bears;
    this.errors = [];
    this.restApi = new Rest(this.bears, this.errors, baseUrl + '/api/bears');

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
      this.restApi.getAll()
        .then(() => {
          sbTopTen.getTopTenBears();
        });
    }.bind(this);

    this.createBear = function() {
      this.restApi.create(this.newBear)
        .then(() => {
          this.newBear = null;
          sbTopTen.getTopTenBears();
        });
    }.bind(this);

    this.updateBear = function(bear) {
      this.restApi.update(bear)
        .then(() => {
          bear.editing = false;
        });
    }.bind(this);

    this.removeBear = function(bear) {
      this.restApi.remove(bear)
        .then(() => {
          this.bears = this.restApi.data;
          sbTopTen.getTopTenBears();
        });
    }.bind(this);
  }]);
};
