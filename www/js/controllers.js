angular.module('studionic.controllers',[])

.controller('WelcomeCtrl',['$scope','$state','$ionicPopup','$ionicSlideBoxDelegate','UserFactory', function($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, UserFactory){
	
	$scope.user = {
		email: "bruce.wayne@admin.france-bs.com",
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
			UserFactory.signIn($scope.user.email, $scope.user.password).then(function(signedUser){
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

.controller('AppCtrl', ['$scope','$state','UserFactory','SettingFactory','signedUser', function($scope, $state, UserFactory, SettingFactory, signedUser){
	$scope.logOut = function(){
		UserFactory.logOut();
		$state.go('welcome');
	};

	$scope.platform = ionic.Platform.platform();
	$scope.isWebView = ionic.Platform.isWebView();
	$scope.user = signedUser;
	console.log($scope.user);
	SettingFactory.setDefault();
	SettingFactory.get('settings').then(function(settings){
		$scope.settings = settings;
	});

	UserFactory.getRoles(signedUser).then(function(roles){
		$scope.roles = roles;
		$scope.admin = ($scope.roles[0].get('name') == 'admin');
		$scope.$apply();
	});

	// default profile icon
	$scope.profilePicture = '../img/logo-grey.png';
	// if profile pic load it
	if(signedUser.get('profilePicture'))
		$scope.profilePicture = signedUser.get('profilePicture').url();

}])

.controller('StudLifeCtrl',['$scope','$ionicModal', function($scope, $ionicModal){

	$ionicModal.fromTemplateUrl('templates/createLesson.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.createLessonModal = modal;
	},function(error){console.log(error);});

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	  	$scope.createLessonModal.remove();
	});

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


.controller('LessonCardCtrl', ['$scope','LessonFactory', function($scope, LessonFactory){
	LessonFactory.get().then(function(lesson){
		$scope.lesson = lesson;
	});
	$scope.checkin = function(){
		console.log("checkin !");
	};
}])

.controller('LessonCtrl', ['$scope','$stateParams','LessonFactory', function($scope, $stateParams, LessonFactory){
	LessonFactory.get($stateParams.id).then(function(lesson){
		$scope.lesson = lesson;
	});

}])

.controller('CreateLessonCtrl', ['$scope','$stateParams','CourseFactory','RoleFactory', function($scope, $stateParams, CourseFactory, RoleFactory){
	CourseFactory.getAll().then(function(courses){
		$scope.courses = courses;
		console.log(courses);
		$scope.$apply();
	});
	RoleFactory.getGroups().then(function(groups){
		$scope.attendees = groups;
		console.log(groups);
		$scope.$apply();
	});
}])


.controller('ProfileCtrl', ['$scope','$cordovaCamera','UserFactory','SchoolFactory', function($scope, $cordovaCamera, UserFactory, SchoolFactory){

	SchoolFactory.get($scope.user.get('school').id).then(function(school){
		$scope.school = school;
		$scope.coverPicture = school.get('coverPicture').url();
		$scope.$apply();
	});

	$scope.updateProfilePicture = function(){
		$cordovaCamera.getPicture({
			destinationType : navigator.camera.DestinationType.DATA_URL,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: navigator.camera.EncodingType.JPEG,
			targetWidth: 500,
			targetHeight: 500,
			mediaType: navigator.camera.MediaType.PICTURE,
			saveToPhotoAlbum: false
		}).then(function(imageData) {
			// immediately apply background image localy
			$scope.profilePicture = 'data:image/jpeg;base64,'+imageData;
			// save it to the cloud
			UserFactory.setProfilePicture($scope.user,imageData);
		}, function(error) {
			console.log(error);
		});
	};

	$scope.updateCoverPicture = function(){
		if(!$scope.admin){
			console.log("Only admin can update the cover picture");
			return;
		}

		$cordovaCamera.getPicture({
			destinationType : navigator.camera.DestinationType.DATA_URL,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: navigator.camera.EncodingType.JPEG,
			targetWidth: 600,
			targetHeight: 500,
			mediaType: navigator.camera.MediaType.PICTURE,
			saveToPhotoAlbum: false
		}).then(function(imageData) {
			// immediately apply background image localy
			$scope.coverPicture = 'data:image/jpeg;base64,'+imageData;
			// get the school object corresponding to the user
			SchoolFactory.get($scope.user.get('school').id).then(function(school){
				// save school object with cover picture to the cloud
				SchoolFactory.setCoverPicture(school, imageData);
			});
		}, function(error) {
			console.log(error);
		});
	};
	
}]);
