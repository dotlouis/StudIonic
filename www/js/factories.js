angular.module('studionic.factories', [])

.factory('AuthFactory', ['$q', function($q){	
	return {
		currentUser: function(){
			var deferred = $q.defer();
			var currentUser = Parse.User.current();
			if(currentUser)
				deferred.resolve(currentUser);
			else
				deferred.reject("No current user");
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
}]);