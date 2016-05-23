const angular = require('angular');
require('angular-mocks');

describe('slothbear controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('slothbearApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var slothbearsctrl = $controller('SlothbearsController');
    expect(typeof slothbearsctrl).toBe('object');
    expect(typeof slothbearsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var slothbearsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      slothbearsctrl = $controller('SlothbearsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve slothbears', function() {
      $httpBackend.expectGET('http://localhost:5555/api/slothbears')
        .respond(200, [{ name: 'test slothbear' }]);
      slothbearsctrl.getAll();
      $httpBackend.flush();
      expect(slothbearsctrl.slothbears.length).toBe(1);
      expect(slothbearsctrl.slothbears[0].name).toBe('test slothbear');
    });

    it('should create a slothbear', function() {
      $httpBackend.expectGET('http://localhost:5555/api/mate')
        .respond(200);
      expect(slothbearsctrl.slothbears.length).toBe(0);
      slothbearsctrl.createSlothbear();
      $httpBackend.flush();
      expect(slothbearsctrl.slothbears.length).toBe(1);
    });

    it('should update a slothbear', function() {
      $httpBackend.expectPUT('http://localhost:5555/api/slothbears/1',
        { name: 'change slothbear', editing: true, _id: 1 })
        .respond(200);
      slothbearsctrl.slothbears = [{ name: 'test slothbear', editing: true, _id: 1 }];
      slothbearsctrl.slothbears[0].name = 'change slothbear';
      slothbearsctrl.updateSlothbear(slothbearsctrl.slothbears[0]);
      $httpBackend.flush();
      expect(slothbearsctrl.slothbears[0].editing).toBe(false);
    });

    it('should murder a slothbear', function() {
      $httpBackend.expectDELETE('http://localhost:5555/api/slothbears/1').respond(200);
      slothbearsctrl.slothbears = [{ name: 'slomo', _id: 1 }];
      slothbearsctrl.removeSlothbear(slothbearsctrl.slothbears[0]);
      $httpBackend.flush();
      expect(slothbearsctrl.slothbears.length).toBe(0);
    });
  });
});
