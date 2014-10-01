angular.module('studionic.controllers')

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
}]);
