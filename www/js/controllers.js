angular.module('studionic.controllers',[])

.controller('WelcomeCtrl',['$scope','$ionicPopup', function($scope, $ionicPopup){
	
	$scope.user = {
		email: "",
		password: ""
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
						if (!$scope.user.email || !$scope.user.password) {
							console.log($scope.user);
							if(!$scope.user.email)
								alert("Please enter a valid email adress");
							else if(!$scope.user.password)
								alert("Please enter a password");
							else
								console.log("ohoh");

							//don't allow the user to close unless he enters his credentials
							e.preventDefault();
						} else {
							return $scope.user;
						}
					}
				},
			]
		});
	};

}]);