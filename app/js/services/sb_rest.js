module.exports = function(app) {
  app.factory('sbRest', ['$http', 'sbHandleError', function($http, sbHandleError, sbTopTen) {
    var Rest = function(restArr, errorsArr, baseUrl) {
      this.data = restArr;
      this.errors = errorsArr;
      this.url = baseUrl;
    };

    Rest.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.data.push(res.data[i]);
          }
        }, sbHandleError(this.errors, 'could not fetch resource'));
    };

    Rest.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, sbHandleError(this.errors, 'could not create resource'));
    };

    Rest.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(sbHandleError(this.errors, 'could not update resource'));
    };

    Rest.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id, resource)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, sbHandleError(this.errors, 'could not remove resource'));
    };

    return Rest;
  }]);
};
