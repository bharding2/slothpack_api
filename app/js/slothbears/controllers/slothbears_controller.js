var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SlothbearsController', ['sbRest', 'sbMate', 'sbTopTen',
  function(Rest, Mate, sbTopTen) {
    this.topTen = sbTopTen;
    this.slothbears = [];
    this.errors = [];
    this.restApi = new Rest(this.slothbears, this.errors, baseUrl + '/api/slothbears');
    this.mateApi = new Mate(this.slothbears, this.errors, baseUrl + '/api/mate');

    this.backup = (slothbear) => {
      slothbear.backup = angular.copy(slothbear);
    };

    this.restoreBackup = (slothbear) => {
      angular.copy(slothbear.backup, slothbear);
    };

    this.deleteBackup = (slothbear) => {
      delete slothbear.backup;
    };

    this.getAll = this.restApi.getAll.bind(this.restApi);

    this.createSlothbear = function() {
      this.mateApi.create()
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
      this.restApi.update(slothbear)
        .then(() => {
          slothbear.editing = false;
        });
    }.bind(this);

    this.removeSlothbear = function(slothbear) {
      this.restApi.remove(slothbear)
      .then(() => {
        this.slothbears = this.restApi.data;
      });
    }.bind(this);

    this.getAll();
  }]);
};
