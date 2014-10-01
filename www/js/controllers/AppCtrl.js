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

    // UserFactory.getRoles(signedUser).then(function(roles){
    //     $scope.roles = roles;
    //     $scope.admin = ($scope.roles[0].get('name') == 'admin');
    //     $scope.$apply();
    // });

    // default profile icon
    $scope.profilePicture = '../img/logo-grey.png';
    // if profile pic load it
    if(signedUser.get('profilePicture'))
        $scope.profilePicture = signedUser.get('profilePicture').url();

}]);
