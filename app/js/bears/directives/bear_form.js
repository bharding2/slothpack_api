module.exports = function(app) {
  app.directive('bearForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/bears/directives/bear_form.html',
      scope: {
        bear: '=',
        buttonText: '@',
        savemethod: '@'
      },
      link: function(scope, element, attrs, controller) {
        var methods = {
          update: controller.updateBear,
          create: controller.createBear
        };
        scope.save = methods[scope.savemethod];
      }
    };
  });
};
