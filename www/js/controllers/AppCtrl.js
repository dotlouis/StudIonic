angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','User','Setting','signedUser','$ionicViewService', function($scope, $state, User, Setting, signedUser, $ionicViewService){
    $scope.logout = function(){
        User.logout().$promise.then(function(){
            $state.go('welcome');
        });
    };

    // Used to clear history after signinIn or singinUp
    // see https://github.com/studapp/Studionic/issues/2
    $ionicViewService.clearHistory();

    $scope.user = signedUser;
    Setting.setDefault();
    Setting.get('settings').then(function(settings){
        $scope.settings = settings;
    });


}]);
