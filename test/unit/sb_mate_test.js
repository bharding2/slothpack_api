/* eslint-disable new-cap */
const angular = require('angular');
require('angular-mocks');

describe('sb mate service', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('slothbearApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  it('should return a function', angular.mock.inject(function(sbMate) {
    expect(typeof sbMate).toBe('function');
  }));


  it('should get all of the resources', angular.mock.inject(function(sbMate) {
    $httpBackend.expectGET('http://localhost:5555/api/mate').respond(200, { name: 'testy' });
    var slothbears = [];
    var errors = [];
    var testUrl = 'http://localhost:5555/api/mate';
    var testMate = new sbMate(slothbears, errors, testUrl);
    testMate.create();
    $httpBackend.flush();
    expect(slothbears.length).toBe(1);
    expect(slothbears[0].name).toBe('testy');
  }));
});
