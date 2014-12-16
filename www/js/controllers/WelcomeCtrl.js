angular.module('studionic.controllers')

.controller('WelcomeCtrl',['$scope','$state','$ionicPopup','$ionicSlideBoxDelegate','User','$ionicHistory', function($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, User, $ionicHistory){

    $scope.user = {
        univId: 2131700
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

    $scope.login = function(){
        var id = $scope.user.univId.toString();
        User.login({
            email: id+"@dev.null",
            password: id
        }).$promise.then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go('app.studlife');
        }, function(error){
            $ionicPopup.alert({
                title: "Login",
                template: error.message
            });
        });
    }

}]);
