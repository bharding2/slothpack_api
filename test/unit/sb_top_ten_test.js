const angular = require('angular');
require('angular-mocks');

describe('sbTopTen service', function() {
  beforeEach(angular.mock.module('slothbearApp'));

  it('should be a function', angular.mock.inject(function(sbTopTen) {
    expect(typeof sbTopTen).toBe('object');
  }));

  it('should persist top ten bears', angular.mock.inject(function(sbTopTen) {
    var testArr = [
      { offspring: ['test'] },
      { offspring: ['test', 'test'] },
      { offspring: ['test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }
    ];

    sbTopTen.bears = testArr;
    sbTopTen.getTopTenBears();
    expect(Array.isArray(sbTopTen.topTenBears)).toBe(true);
    expect(sbTopTen.topTenBears.length).toBe(10);
    expect(sbTopTen.topTenBears[0].offspring.length).toBe(11);
  }));

  it('should persist top ten sloths', angular.mock.inject(function(sbTopTen) {
    var testArr = [
      { offspring: ['test'] },
      { offspring: ['test', 'test'] },
      { offspring: ['test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] },
      { offspring: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }
    ];
    
    sbTopTen.sloths = testArr;
    sbTopTen.getTopTenSloths();
    expect(Array.isArray(sbTopTen.topTenSloths)).toBe(true);
    expect(sbTopTen.topTenSloths.length).toBe(10);
    expect(sbTopTen.topTenSloths[0].offspring.length).toBe(11);
  }));
});
