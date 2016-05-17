const angular = require('angular');
const slothbearApp = angular.module('slothbearApp', []);
const port = process.env.PORT || 5555;
console.log(port);
const baseUrl = 'http://localhost:' + port;

var handleErr = function(err) {
  console.log(err);
  this.errs = (this.errs || []).push(err);
};

slothbearApp.controller('BearsController', ['$http', function($http) {
  this.bears = [];

  this.backup = (bear) => {
    bear.backup = angular.copy(bear);
  };

  this.restoreBackup = (bear) => {
    angular.copy(bear.backup, bear);
  };

  this.deleteBackup = (bear) => {
    delete bear.backup;
  };

  this.getAll = () => {
    $http.get(baseUrl + '/api/bears')
      .then((response) => {
        this.bears = response.data;
      }, handleErr.bind(this));
  };

  this.createBear = () => {
    $http.post(baseUrl + '/api/bears', this.newBear)
      .then((response) => {
        this.bears.push(response.data);
        this.newBear = null;
      }, handleErr.bind(this));
  };

  this.updateBear = (bear) => {
    $http.put(baseUrl + '/api/bears/' + bear._id, bear)
      .then(() => {
        bear.editing = false;
      }, handleErr.bind(this));
  };

  this.removeBear = (bear) => {
    $http.delete(baseUrl + '/api/bears/' + bear._id)
      .then(() => {
        this.bears.splice(this.bears.indexOf(bear), 1);
      }, handleErr.bind(this));
  };
}]);

slothbearApp.controller('SlothsController', ['$http', function($http) {
  this.sloths = [];

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
      }, handleErr.bind(this));
  };

  this.createSloth = () => {
    $http.post(baseUrl + '/api/sloths', this.newSloth)
      .then((response) => {
        this.sloths.push(response.data);
        this.newSloth = null;
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
      }, handleErr.bind(this));
  };
}]);

slothbearApp.controller('SlothbearsController', ['$http', function($http) {
  this.slothbears = [];

  this.backup = (slothbear) => {
    slothbear.backup = angular.copy(slothbear);
  };

  this.restoreBackup = (slothbear) => {
    angular.copy(slothbear.backup, slothbear);
  };

  this.deleteBackup = (slothbear) => {
    delete slothbear.backup;
  };

  this.getAll = () => {
    $http.get(baseUrl + '/api/slothbears')
      .then((response) => {
        this.slothbears = response.data;
      }, handleErr.bind(this));
  };

  this.createSlothbear = () => {
    $http.get(baseUrl + '/api/mate')
      .then((response) => {
        this.slothbears.push(response.data);
      }, handleErr.bind(this));
  };

  this.updateSlothbear = (slothbear) => {
    $http.put(baseUrl + '/api/slothbears/' + slothbear._id, slothbear)
      .then(() => {
        slothbear.editing = false;
      }, handleErr.bind(this));
  };

  this.removeSlothbear = (slothbear) => {
    $http.delete(baseUrl + '/api/slothbears/' + slothbear._id)
      .then(() => {
        this.slothbears.splice(this.slothbears.indexOf(slothbear), 1);
      }, handleErr.bind(this));
  };
}]);
