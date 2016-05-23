module.exports = function(app) {
  app.directive('bearListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/bears/directives/bear_list_item.html',
      scope: {
        bear: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.removeBear = controller.removeBear;
        scope.backup = controller.backup;
      }
    };
  });
};
