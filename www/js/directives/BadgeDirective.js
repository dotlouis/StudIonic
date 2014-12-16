angular.module('studionic.directives')

.directive('badge', [function() {
    return {
        restrict: 'E',
        template: '<div ng-if="setup.enabled && data" ng-include="setup.templateUrl" class="badge-group"></div>',
        scope: {
            setup: "=",
            data: "="
        }
    };
}]);
