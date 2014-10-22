angular.module('studionic.controllers')

.controller('WelcomeCtrl',['$scope','$state','$ionicPopup','$ionicSlideBoxDelegate','UserFactory', function($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, UserFactory){

    $scope.user = {
        email: "larry.page@admin.france-bs.com",
        password: "imlarry"
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

    $scope.logIn = function(){
        UserFactory.logIn($scope.user.email, $scope.user.password).then(function(signedUser){
            $state.go('app.studlife');
        }, function(error){
            $ionicPopup.alert({
                title: "Login",
                template: error.message
            });
        });
    }

}]);
