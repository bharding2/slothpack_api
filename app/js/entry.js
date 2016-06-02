const angular = require('angular');
require('angular-route');
const slothbearApp = angular.module('slothbearApp', ['ngRoute']);

require('./bears')(slothbearApp);
require('./sloths')(slothbearApp);
require('./slothbears')(slothbearApp);
require('./auth')(slothbearApp);
require('./services')(slothbearApp);

slothbearApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    .when('/sloths', {
      templateUrl: 'templates/sloths/views/sloths_view.html',
      controller: 'SlothsController',
      controllerAs: 'slothsctrl'
    })
    .when('/slothbears', {
      templateUrl: 'templates/slothbears/views/slothbears_view.html',
      controller: 'SlothbearsController',
      controllerAs: 'slothbearsctrl'
    })
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirect: '/bears'
    });
}]);
