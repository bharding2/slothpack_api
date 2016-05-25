const angular = require('angular');
require('angular-mocks');

describe('sbHandleError service', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  it('should be a function', angular.mock.inject(function(sbHandleError) {
    expect(typeof sbHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(sbHandleError) {
    var testArr = [];
    sbHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
