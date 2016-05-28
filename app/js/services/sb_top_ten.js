module.exports = function(app) {
  app.factory('sbTopTen', function() {
    return {
      bears: [],
      sloths: [],
      topTenBears: [],
      topTenSloths: [],
      getTopTenBears: function() {
        this.topTenBears = this.bears.slice()
          .sort((a, b) => {
            return b.offspring.length - a.offspring.length;
          });
        if (this.topTenBears.length > 10) this.topTenBears.length = 10;
      },
      getTopTenSloths: function() {
        this.topTenSloths = this.sloths.slice()
          .sort((a, b) => {
            return b.offspring.length - a.offspring.length;
          });
        if (this.topTenSloths.length > 10) this.topTenSloths.length = 10;
      }
    };
  });
};
