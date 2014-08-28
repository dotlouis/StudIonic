angular.module('studionic.controllers',[])

.controller('WelcomeCtrl',['$scope','$state','$ionicPopup','AuthFactory', function($scope, $state, $ionicPopup, AuthFactory){
	
	$scope.user = {
		email: "bruce@wayne.com",
		password: "imbatman"
	};

	$scope.showLoginPopup = function(){
		var loginPopup = $ionicPopup.show({
			template: '<input type="email" ng-model="user.email" placeholder="email" autofocus><br/>'+
					  '<input type="password" ng-model="user.password" placeholder="password">',
			title: 'Log In',
			subTitle: 'Use your school credentials',
			scope: $scope,
			buttons: [
				{ text: 'Cancel' },
				{
					text: '<b>Login</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.user.email) {
							alert("Please enter a valid email adress");
							//don't allow the user to close unless he enters his credentials
							e.preventDefault();
						}
						else if(!$scope.user.password){
							alert("Please enter a password");
							e.preventDefault();
						}
						else {
							AuthFactory.signIn($scope.user.email, $scope.user.password).then(function(signedUser){
								$state.go('app.studlife');
							}, function(error){
								$ionicPopup.alert({
									title: "Login",
									template: error.message
								});
							});
							//return $scope.user;
						}
					}
				},
			]
		});
	};

}])

.controller('AppCtrl', ['$scope','$state','AuthFactory','SettingFactory','signedUser', function($scope, $state, AuthFactory, SettingFactory, signedUser){
	$scope.logOut = function(){
		AuthFactory.logOut();
		$state.go('welcome');
	};

	$scope.user = signedUser;
	SettingFactory.setDefault();
	SettingFactory.get('settings').then(function(settings){
		$scope.settings = settings;
	});

}])

.controller('StudLifeCtrl', ['$scope','$ionicPopup','$cordovaSocialSharing', function($scope, $ionicPopup, $cordovaSocialSharing){
	$scope.tweetIntent = function(){
		$cordovaSocialSharing.shareViaTwitter("@studapp", null, null).then(function(result) {
			console.log(result); 
		}, function(err) {
			$ionicPopup.alert({
				title: 'Can\'t use Twitter',
				template: 'You may have no Twitter app installed'
			});
		});
	};

	$scope.emailIntent = function(){
		$cordovaSocialSharing.shareViaEmail("", "Feedback", ["studapp@gmail.com"], null, null, null).then(function(result) {
			console.log(result);
		}, function(err) {
			console.log(err);
		});
	};
}])

.controller('ProfileCtrl', ['$scope','UserFactory', function($scope, UserFactory){

	UserFactory.get($scope.user).then(function(userdata){
		$scope.userdata = userdata;
	});
	
}]);
