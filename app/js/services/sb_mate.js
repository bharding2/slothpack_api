module.exports = function(app) {
  app.factory('sbMate', ['$http', 'sbHandleError', function($http, sbHandleError) {
    var Mate = function(slothbearArr, errorArr, baseUrl) {
      this.data = slothbearArr;
      this.errors = errorArr;
      this.url = baseUrl;
    };

    Mate.prototype.create = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.push(res.data);
        }, sbHandleError(this.errors, 'could not create slothbear'));
    };

    return Mate;
  }]);
};
