angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','UserFactory','SettingFactory','signedUser','$ionicViewService', function($scope, $state, UserFactory, SettingFactory, signedUser, $ionicViewService){
    $scope.logOut = function(){
        UserFactory.logOut();
        $state.go('welcome');
    };

    // Used to clear history after signinIn or singinUp
    // see https://github.com/studapp/Studionic/issues/2
    $ionicViewService.clearHistory();

    $scope.user = signedUser;
    SettingFactory.setDefault();
    SettingFactory.get('settings').then(function(settings){
        $scope.settings = settings;
    });


}]);
