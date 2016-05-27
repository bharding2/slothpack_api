var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['sbRest', 'sbTopTen', function(Rest, sbTopTen) {
    this.topTen = sbTopTen;
    this.bears = [];
    this.topTen.bears = this.bears;
    this.errors = [];
    var restApi = new Rest(this.bears, this.errors, baseUrl + '/api/bears');

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
      restApi.getAll()
        .then(() => {
          sbTopTen.getTopTenBears();
        });
    };

    this.createBear = function() {
      restApi.create(this.newBear)
        .then(() => {
          this.newBear = null;
          sbTopTen.getTopTenBears();
        });
    }.bind(this);

    this.updateBear = function(bear) {
      restApi.update(bear)
        .then(() => {
          bear.editing = false;
        });
    };

    this.removeBear = function(bear) {
      restApi.remove(bear)
        .then(() => {
          sbTopTen.getTopTenBears();
        });
    };
  }]);
};
