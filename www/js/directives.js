angular.module('studionic.directives',[])

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
}])

.directive('badge', [function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="setup.enabled && data" ng-include="setup.templateUrl" class="badge-group"></div>',
		scope: {
			setup: "=",
			data: "="
		}
	};
}])

.directive('file', ['UserFactory', function(UserFactory){
    return {
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                	var imageData = e.target.result;
                	// immediately apply background image localy
                	scope.$apply(function(){
                		scope.profileSrc = imageData;
                		console.log(scope.profileSrc);
                	});
                	// save it to the cloud
                	//UserFactory.setProfilePicture(imageData);
                };
                reader.readAsDataURL(file);
            });
        }
    };
}]);