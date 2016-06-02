const angular = require('angular');
require('angular-mocks');

describe('sloths controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('slothbearApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var slothsctrl = $controller('SlothsController');
    expect(typeof slothsctrl).toBe('object');
    expect(typeof slothsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var slothsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      slothsctrl = $controller('SlothsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve sloths', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sloths')
        .respond(200, [{ name: 'other' }]);
      $httpBackend.flush();
      $httpBackend.expectGET('http://localhost:5555/api/sloths')
        .respond(200, [{ name: 'test sloth' }]);
      slothsctrl.getAll();
      $httpBackend.flush();
      expect(slothsctrl.sloths.length).toBe(1);
      expect(slothsctrl.sloths[0].name).toBe('test sloth');
    });

    it('should create a sloth', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sloths')
        .respond(200, [{ name: 'other', offspring: [] }]);
      $httpBackend.flush();
      $httpBackend.expectPOST('http://localhost:5555/api/sloths', { name: 'slomo', offspring: [] })
        .respond(200, { name: 'some sloth', offspring: [] });
      expect(slothsctrl.sloths.length).toBe(1);
      slothsctrl.newSloth = { name: 'slomo', offspring: [] };
      slothsctrl.createSloth();
      $httpBackend.flush();
      expect(slothsctrl.sloths[1].name).toBe('some sloth');
      expect(slothsctrl.newSloth).toBe(null);
    });

    it('should update a sloth', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sloths')
        .respond(200, [{ name: 'other' }]);
      $httpBackend.flush();
      $httpBackend.expectPUT('http://localhost:5555/api/sloths/1',
        { name: 'change sloth', editing: true, _id: 1 })
        .respond(200);
      slothsctrl.sloths = [{ name: 'test sloth', editing: true, _id: 1 }];
      slothsctrl.sloths[0].name = 'change sloth';
      slothsctrl.updateSloth(slothsctrl.sloths[0]);
      $httpBackend.flush();
      expect(slothsctrl.sloths[0].editing).toBe(false);
    });

    it('should murder a sloth', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sloths')
        .respond(200, [{ name: 'other' }]);
      $httpBackend.flush();
      $httpBackend.expectDELETE('http://localhost:5555/api/sloths/1').respond(200);
      slothsctrl.sloths = [{ name: 'slomo', _id: 1 }];
      slothsctrl.removeSloth(slothsctrl.sloths[0]);
      $httpBackend.flush();
      expect(slothsctrl.sloths.length).toBe(0);
    });
  });
});
