angular.module('studionic.controllers')

.controller('AppCtrl', ['$scope','$state','User','Setting','$ionicHistory', function($scope, $state, User, Setting, $ionicHistory){
    $scope.logout = function(){
        User.logout().$promise.then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go('welcome');
        });
    };

    $scope.user = User.getCachedCurrent();
    Setting.setDefault();
    Setting.get('settings').then(function(settings){
        $scope.settings = settings;
    });


}]);
