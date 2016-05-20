module.exports = function(app) {
  app.directive('slothForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sloths/directives/sloth_form.html',
      scope: {
        sloth: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSloth,
          create: controller.createSloth
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
