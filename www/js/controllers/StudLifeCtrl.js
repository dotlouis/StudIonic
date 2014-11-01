angular.module('studionic.controllers')

.controller('StudLifeCtrl',['$scope','$ionicModal','LessonFactory', function($scope, $ionicModal, LessonFactory){

    $scope.lessons;

    if($scope.user.isAdmin){
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
    }

    LessonFactory.getForAttendees($scope.user.role).then(function(lessons){
        $scope.lessons = lessons;
    });

}]);
