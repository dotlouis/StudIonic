angular.module('studionic.directives')

.directive('mdCard', [function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div ng-if="setup.enabled" ng-include="setup.templateUrl" class="card card-md"></div>',
        scope: {
            // shit dat iz no ez:
            // https://docs.angularjs.org/guide/directive#directivedefinitionobject
            // and
            // http://stackoverflow.com/questions/13091204/how-do-i-isolate-only-a-single-value-in-my-directive-scope
            setup: '='
        }
    };
}]);
