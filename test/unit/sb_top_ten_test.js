const angular = require('angular');
require('angular-mocks');

describe('sbTopTen service', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  it('should be a function', angular.mock.inject(function(sbTopTen) {
    expect(typeof sbTopTen).toBe('function');
  }));

  it('should return an array of the top ten', angular.mock.inject(function(sbTopTen) {
    var testArr = [
      { offspring: 1 },
      { offspring: 2 },
      { offspring: 3 },
      { offspring: 4 },
      { offspring: 5 },
      { offspring: 6 },
      { offspring: 7 },
      { offspring: 8 },
      { offspring: 9 },
      { offspring: 10 },
      { offspring: 11 }
    ];
    var topTenArr = sbTopTen(testArr);
    expect(Array.isArray(topTenArr)).toBe(true);
    expect(topTenArr.length).toBe(10);
  }));
});
