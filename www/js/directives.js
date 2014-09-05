angular.module('studionic.directives',[])

.directive('mdCard', [function() {
	// The partial attribute must be the name of the template file you
	// should use for the card (without ".html")
	// it also should be the same name used in the defaultSetting card value
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
}])

.directive('badge', [function() {
	// The partial attribute must be the name of the template file you
	// should use for the card (without ".html")
	// it also should be the same name used in the defaultSetting card value
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="setup.enabled" ng-include="setup.templateUrl" class="badge"></div>',
		scope: {
			setup: "=",
			data: "="
		}
	};
}]);
