angular.module('studionic.controllers')

.controller('LessonCardCtrl', ['$scope','LessonFactory', function($scope, LessonFactory){
    $scope.lesson = $scope.data;
}]);
