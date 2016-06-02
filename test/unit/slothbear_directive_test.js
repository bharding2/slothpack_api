const angular = require('angular');
require('angular-mocks');
const slothbearForm = require('../../app/templates/slothbears/directives/slothbear_form.html');
const slothbearListItem =
require('../../app/templates/slothbears/directives/slothbear_list_item.html');

describe('slothbear directives', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  var $httpBackend;
  var $compile;
  var $scope;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('should create a slothbear list item', function() {
    $httpBackend.expectGET('/templates/slothbears/directives/slothbear_list_item.html')
      .respond(200, slothbearListItem);
    $scope.slothbear = {
      name: 'Rick',
      gender: 'm',
      weight: 100,
      strength: 10,
      offspring: ['little rick']
    };

    var list = $compile('<section data-ng-controller="SlothbearsController as slothbearsctrl"><slothbear-list-item data-slothbear="slothbear"></slothbear-list-item></section>');  // eslint-disable-line max-len
    $httpBackend.expectGET('http://localhost:5555/api/slothbears')
      .respond(200, [{
        name: 'Rick',
        gender: 'm',
        weight: 100,
        strength: 10,
        offspring: ['little rick']
      }]);
    var directive = list($scope);
    $httpBackend.flush();

    var span = directive.find('span');

    expect(span.text()).toEqual('Rick (gender: m) weighs 100 lbs and has a strength of 10');
  });

  it('should create a slothbear form', function() {
    $httpBackend.expectGET('/templates/slothbears/directives/slothbear_form.html')
      .respond(200, slothbearForm);

    var form = $compile('<section data-ng-controller="SlothbearsController as slothbearsctrl"><slothbear-form data-button-text="Update Slothbear"></slothbear-form></section>');  // eslint-disable-line max-len
    $httpBackend.expectGET('http://localhost:5555/api/slothbears')
      .respond(200, [{ name: 'other' }]);
    var directive = form($scope);
    $httpBackend.flush();

    var button = directive.find('button');
    expect(button.text()).toEqual('Update Slothbear');
  });
});
