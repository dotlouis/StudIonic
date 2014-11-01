angular.module('studionic.controllers')

.controller('LessonCtrl', ['$scope','$stateParams','LessonFactory', function($scope, $stateParams, LessonFactory){
    LessonFactory.get($stateParams.id).then(function(lesson){
        $scope.lesson = lesson;
        $scope.lesson.description = "placeholder for description";
        $scope.lesson.assignements = ["do stuff", "do another thing", "meh... homeworks"];
    });
}]);
