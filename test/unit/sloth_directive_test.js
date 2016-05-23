const angular = require('angular');
require('angular-mocks');
const slothForm = require('../../app/templates/sloths/directives/sloth_form.html');
const slothListItem = require('../../app/templates/sloths/directives/sloth_list_item.html');

describe('sloth directives', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  var $httpBackend;
  var $compile;
  var $scope;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('should create a sloth list item', function() {
    $httpBackend.expectGET('/templates/sloths/directives/sloth_list_item.html')
      .respond(200, slothListItem);
    $scope.sloth = {
      name: 'Rick',
      gender: 'm',
      weight: 100,
      strength: 10,
      offspring: ['little rick']
    };

    var list = $compile('<section data-ng-controller="SlothsController as slothsctrl"><sloth-list-item data-sloth="sloth"></sloth-list-item></section>');  // eslint-disable-line max-len
    var directive = list($scope);
    $httpBackend.flush();

    var span = directive.find('span');

    expect(span.text()).toEqual('Rick (gender: m) weighs 100 lbs and has a strength of 10');
  });

  it('should create a sloth form', function() {
    $httpBackend.expectGET('/templates/sloths/directives/sloth_form.html')
      .respond(200, slothForm);

    var form = $compile('<section data-ng-controller="SlothsController as slothsctrl"><sloth-form data-button-text="Create Sloth"></sloth-form></section>');  // eslint-disable-line max-len
    var directive = form($scope);
    $httpBackend.flush();

    var button = directive.find('button');
    expect(button.text()).toEqual('Create Sloth');
  });
});
