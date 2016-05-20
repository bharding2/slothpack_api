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
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSlothbear,
          create: controller.createSlothbear
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
