const angular = require('angular');
require('angular-mocks');
const bearForm = require('../../app/templates/bears/directives/bear_form.html');
const bearListItem = require('../../app/templates/bears/directives/bear_list_item.html');

describe('bear directives', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  var $httpBackend;
  var $compile;
  var $scope;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('should create a bear list item', function() {
    $httpBackend.expectGET('/templates/bears/directives/bear_list_item.html')
      .respond(200, bearListItem);
    $scope.bear = {
      name: 'Rick',
      gender: 'm',
      weight: 100,
      strength: 10,
      offspring: ['little rick']
    };

    var list = $compile('<section data-ng-controller="BearsController as bearsctrl"><bear-list-item data-bear="bear"></bear-list-item></section>');  // eslint-disable-line max-len
    var directive = list($scope);
    $httpBackend.flush();

    var span = directive.find('span');

    expect(span.text()).toEqual('Rick (gender: m) weighs 100 lbs and has a strength of 10');
  });

  it('should create a bear form', function() {
    $httpBackend.expectGET('/templates/bears/directives/bear_form.html')
      .respond(200, bearForm);

    var form = $compile('<section data-ng-controller="BearsController as bearsctrl"><bear-form data-button-text="Create Bear"></bear-form></section>');  // eslint-disable-line max-len
    var directive = form($scope);
    $httpBackend.flush();

    var button = directive.find('button');
    expect(button.text()).toEqual('Create Bear');
  });
});
