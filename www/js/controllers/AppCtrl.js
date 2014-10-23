angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','UserFactory','SettingFactory','signedUser','$ionicViewService', function($scope, $state, UserFactory, SettingFactory, signedUser, $ionicViewService){
    $scope.logOut = function(){
        UserFactory.logOut();
        $state.go('welcome');
    };

    // Used to clear history after signinIn or singinUp
    // see https://trello.com/c/r1qOsxpo/13-clear-back-history-for-android-after-login-singing-up
    $ionicViewService.clearHistory();
    console.log($ionicViewService._getHistory());

    $scope.user = signedUser;
    SettingFactory.setDefault();
    SettingFactory.get('settings').then(function(settings){
        $scope.settings = settings;
    });


}]);
