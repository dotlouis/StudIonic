angular.module('studionic.factories', [])

.factory('AuthFactory', ['$q', function($q){	
	return {
		currentUser: function(){
			var deferred = $q.defer();
			var currentUser = Parse.User.current();
			if(currentUser){
				console.log(currentUser);
				deferred.resolve(currentUser);
			}
			else{
				console.log("No current user");
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

.factory('UserFactory', ['$q', function($q){
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
}])

.factory('SettingFactory', ['$q','DefaultSettings', function($q, DefaultSettings){
	return {
		key: function(index){
			var deferred = $q.defer();
			var keyName = window.localStorage.key(index);
			deferred.resolve(keyName);
			return deferred.promise;
		},
		get: function(key){
			var deferred = $q.defer();
			var value = JSON.parse(window.localStorage.getItem(key) || {});
			deferred.resolve(value);
			return deferred.promise;
		},
		set: function(key, value){
			window.localStorage.setItem(key,JSON.stringify(value));
		},
		remove: function(key){
			window.localStorage.removeItem(key);
		},
		clear: function(){
			window.localStorage.clear();
		},
		setDefault: function(){
			this.set('settings',DefaultSettings);
		}
	}
}]);
