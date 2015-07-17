angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','CustomUser','Setting','$ionicHistory', function($scope, $state, CustomUser, Setting, $ionicHistory){
    $scope.logout = function(){
        CustomUser.logout().$promise.then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: false,
                historyRoot: true
            });
            $state.go('welcome');
        });
    };

    $scope.user = CustomUser.getCachedCurrent();
    Setting.setDefault();
    Setting.get('settings').then(function(settings){
        $scope.settings = settings;
    });


}]);
