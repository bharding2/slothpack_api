/* eslint-disable new-cap */
const angular = require('angular');
require('angular-mocks');

describe('sb rest services', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('slothbearApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  it('should return a function', angular.mock.inject(function(sbRest) {
    expect(typeof sbRest).toBe('function');
  }));

  it('should get all of the resources', angular.mock.inject(function(sbRest) {
    $httpBackend.expectGET('http://localhost:5555/api/bears').respond(200, [{ name: 'testy' }]);
    var bears = [];
    var errors = [];
    var testUrl = 'http://localhost:5555/api/bears';
    var testRest = new sbRest(bears, errors, testUrl);
    testRest.getAll();
    $httpBackend.flush();
    expect(bears.length).toBe(1);
    expect(bears[0].name).toBe('testy');
  }));

  it('should create a resource', angular.mock.inject(function(sbRest) {
    $httpBackend.expectPOST('http://localhost:5555/api/bears', { name: 'yogi' })
      .respond(200, { name: 'testy' });
    var bears = [];
    var errors = [];
    var testUrl = 'http://localhost:5555/api/bears';
    var testRest = new sbRest(bears, errors, testUrl);
    var newBear = { name: 'yogi' };
    testRest.create(newBear);
    $httpBackend.flush();
    expect(bears[0].name).toBe('testy');
  }));

  it('should update a resource');

  it('should remove a resource', angular.mock.inject(function(sbRest) {
    $httpBackend.expectDELETE('http://localhost:5555/api/bears/1').respond(200);
    var bears = [{ name: 'testy', _id: 1 }];
    var errors = [];
    var testUrl = 'http://localhost:5555/api/bears';

    var testRest = new sbRest(bears, errors, testUrl);
    testRest.remove(bears[0]);
    $httpBackend.flush();
    expect(bears.length).toBe(0);
  }));
});
