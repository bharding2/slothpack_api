var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothbearsController', ['sbRest', 'sbMate', 'sbTopTen',
  function(Rest, Mate, sbTopTen) {
    this.slothbears = [];
    this.errors = [];
    var restApi = new Rest(this.slothbears, this.errors, baseUrl + '/api/slothbears');
    var mateApi = new Mate(this.slothbears, this.errors, baseUrl + '/api/mate');

    this.backup = (slothbear) => {
      slothbear.backup = angular.copy(slothbear);
    };

    this.restoreBackup = (slothbear) => {
      angular.copy(slothbear.backup, slothbear);
    };

    this.deleteBackup = (slothbear) => {
      delete slothbear.backup;
    };

    this.getAll = restApi.getAll.bind(restApi);

    this.createSlothbear = mateApi.create.bind(mateApi);

    this.updateSlothbear = function(slothbear) {
      restApi.update(slothbear)
        .then(() => {
          slothbear.editing = false;
        });
    };

    this.removeSlothbear = function(slothbear) {
      restApi.remove(slothbear)
        .then(() => {
          this.slothbears.splice(this.slothbears.indexOf(slothbear), 1);
        });
    }.bind(this);
  }]);
};
