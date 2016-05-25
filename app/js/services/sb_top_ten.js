module.exports = function(app) {
  app.factory('sbTopTen', function() {
    return function(animalArr) {
      var topTenArr = animalArr.slice()
        .sort((a, b) => {
          return b.offspring.length - a.offspring.length;
        });
      if (topTenArr.length > 10) topTenArr.length = 10;
      return topTenArr;
    };
  });
};
