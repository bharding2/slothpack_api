var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothbearsController', ['sbRest', 'sbMate', 'sbTopTen',
  function(Rest, Mate, sbTopTen) {
    this.topTen = sbTopTen;
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

    this.createSlothbear = function() {
      mateApi.create()
        .then(() => {
          var currSB = this.slothbears[this.slothbears.length - 1];
          this.topTen.bears.forEach((ele, idx) => {
            if (ele.name === currSB.parents[1]) this.topTen.bears[idx].offspring.push(currSB.name);
          });
          this.topTen.sloths.forEach((ele, idx) => {
            if (ele.name === currSB.parents[0]) this.topTen.sloths[idx].offspring.push(currSB.name);
          });
          sbTopTen.getTopTenBears();
          sbTopTen.getTopTenSloths();
        });
    }.bind(this);

    this.updateSlothbear = function(slothbear) {
      restApi.update(slothbear)
        .then(() => {
          slothbear.editing = false;
        });
    };

    this.removeSlothbear = restApi.remove.bind(restApi);
  }]);
};
