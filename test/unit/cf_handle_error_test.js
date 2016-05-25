const angular = require('angular');
require('angular-mocks');

describe('cfHandleError service', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  it('should be a function', angular.mock.inject(function(cfHandleError) {
    expect(typeof cfHandleError).toBe('function');
  }));

  it('should add an aerror to the errors array', angular.mock.inject(function(cfHandleError) {
    var testArr = [];
    cfHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
