angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','UserFactory','SettingFactory','signedUser', function($scope, $state, UserFactory, SettingFactory, signedUser){
    $scope.logOut = function(){
        UserFactory.logOut();
        $state.go('welcome');
    };

    $scope.user = signedUser;
    SettingFactory.setDefault();
    SettingFactory.get('settings').then(function(settings){
        $scope.settings = settings;
    });

    // default profile icon
    $scope.profilePicture = '../img/logo-grey.png';
    // if profile pic load it
    if(signedUser.get('profilePicture'))
        $scope.profilePicture = signedUser.get('profilePicture').url();

}]);
