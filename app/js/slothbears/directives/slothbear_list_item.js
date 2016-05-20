module.exports = function(app) {
  app.directive('slothbearListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/slothbears/directives/slothbear_list_item.html',
      scope: {
        slothbear: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.removeSlothbear = controller.removeSlothbear;
      }
    };
  });
};
