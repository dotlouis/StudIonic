angular.module('studionic.controllers')

.controller('StudLifeCtrl',['$scope','$ionicModal', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('templates/createLesson.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.createLessonModal = modal;
    },function(error){console.log(error);});

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
          $scope.createLessonModal.remove();
    });

}]);
