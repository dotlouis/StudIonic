angular.module('studionic.controllers',[])

.controller('WelcomeCtrl',['$scope','$state','$ionicPopup','$ionicSlideBoxDelegate','AuthFactory', function($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, AuthFactory){
	
	$scope.user = {
		email: "bruce@wayne.com",
		password: "imbatman"
	};


	$scope.nextSlide = function() {
	   $ionicSlideBoxDelegate.next();
	 }

	$scope.previousSlide = function() {
		$ionicSlideBoxDelegate.previous();
	}

	$scope.lastSlide = function() {
		$ionicSlideBoxDelegate.slide($ionicSlideBoxDelegate.slidesCount()-1);
	}

	$scope.signIn = function(){
		if (!$scope.user.email)
			alert("Please enter a valid email adress");
		else if(!$scope.user.password)
			alert("Please enter a password");
		else {
			AuthFactory.signIn($scope.user.email, $scope.user.password).then(function(signedUser){
				$state.go('app.studlife');
			}, function(error){
				$ionicPopup.alert({
					title: "Login",
					template: error.message
				});
			});
		}
	}

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

.controller('StudLifeCtrl',['$scope', function($scope){

}])


.controller('FeedbackCardCtrl', ['$scope','$ionicPopup','$cordovaSocialSharing', function($scope, $ionicPopup, $cordovaSocialSharing){
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


.controller('CourseCardCtrl', ['$scope','CourseFactory', function($scope, CourseFactory){
	CourseFactory.get().then(function(coursedata){
		$scope.coursedata = coursedata;
	});
	$scope.checkin = function(){
		console.log("checkin !");
	};
}])

.controller('CourseCtrl', ['$scope','$stateParams','CourseFactory', function($scope, $stateParams, CourseFactory){
	CourseFactory.get($stateParams.id).then(function(coursedata){
		$scope.coursedata = coursedata;
	});

}])

.controller('ProfileCtrl', ['$scope','$cordovaCamera','UserFactory', function($scope, $cordovaCamera, UserFactory){

	$scope.updateProfilePicture = function(){
		$cordovaCamera.getPicture({
			destinationType : navigator.camera.DestinationType.DATA_URL,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: navigator.camera.EncodingType.JPEG,
			targetWidth: 100,
			targetHeight: 100,
			mediaType: navigator.camera.MediaType.PICTURE,
			saveToPhotoAlbum: false
		}).then(function(imageData) {
			console.log(imageData);
			UserFactory.setProfilePicture(imageData);
		}, function(error) {
			console.log(error);
		});
	};

	UserFactory.current().then(function(userdata){
		$scope.userdata = userdata;
	});
	
}]);
