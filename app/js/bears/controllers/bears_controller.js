var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['sbRest', 'sbTopTen', function(Rest, sbTopTen) {
    this.bears = [];
    this.topTen = [];
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
          this.topTen = sbTopTen(this.bears);
        });
    }.bind(this);

    this.createBear = function() {
      restApi.create(this.newBear)
        .then(() => {
          this.newBear = null;
          this.topTen = sbTopTen(this.bears);
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
          this.bears.splice(this.bears.indexOf(bear), 1);
          this.topTen = sbTopTen(this.bears);
        });
    }.bind(this);
  }]);
};
