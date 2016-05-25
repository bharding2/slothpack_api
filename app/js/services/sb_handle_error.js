module.exports = function(app) {
  app.factory('sbHandleError', function() {
    return function(errorsArr, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errorsArr)) errorsArr.push(new Error(message || 'server error'));
      };
    };
  });
};
