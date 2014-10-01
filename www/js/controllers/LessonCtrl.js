angular.module('studionic.controllers')

.controller('LessonCtrl', ['$scope','$stateParams','LessonFactory', function($scope, $stateParams, LessonFactory){
    LessonFactory.get($stateParams.id).then(function(lesson){
        $scope.lesson = lesson;
    });
}]);
