const angular = require('angular');
const slothbearApp = angular.module('slothbearApp', []);

require('./bears')(slothbearApp);
require('./sloths')(slothbearApp);
require('./slothbears')(slothbearApp);
require('./services')(slothbearApp);
