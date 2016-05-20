module.exports = function(app) {
  app.directive('slothListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sloths/directives/sloth_list_item.html',
      scope: {
        sloth: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.removeSloth = controller.removeSloth;
      }
    };
  });
};
