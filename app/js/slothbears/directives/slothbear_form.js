module.exports = function(app) {
  app.directive('slothbearForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/slothbears/directives/slothbear_form.html',
      scope: {
        slothbear: '=',
        buttonText: '@',
        savemethod: '@'
      },
      link: function(scope, element, attrs, controller) {
        var methods = {
          update: controller.updateSlothbear,
          create: controller.createSlothbear
        };
        scope.save = methods[scope.savemethod];
      }
    };
  });
};
