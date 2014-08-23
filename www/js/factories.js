angular.module('studionic.factories', [])

.factory('AuthFactory', ['$q','$log', function($q, $log){	
	return {
		currentUser: function(){
			var deferred = $q.defer();
			var currentUser = Parse.User.current();
			if(currentUser){
				$log.debug(currentUser);
				deferred.resolve(currentUser);
			}
			else{
				$log.debug("No current user");
				deferred.reject("No current user");
			}
			return deferred.promise;
		},
		signIn: function(username, password){
			return Parse.User.logIn(username, password);
		},
		logOut: function(){
			Parse.User.logOut();
		},
		signUp: function(username, password){
			return Parse.User.signUp(username, password, {email: username});
		}
	};
}])

.factory('UserFactory', ['$q','$log', function($q, $log){
	return {
		get: function(user){
			var deferred = $q.defer();
			var userdata = {
				fullname: "Larry Page",
				role: "entrepreneur",
				schoolyear: 16,
				schoolname: "Google",
				absences: 2
			};
			deferred.resolve(userdata);
			return	deferred.promise;
		}
	};
}]);
