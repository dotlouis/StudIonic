angular.module('studionic.controllers')

.controller('LessonCardCtrl', ['$scope','LessonFactory', function($scope, LessonFactory){
    LessonFactory.get().then(function(lesson){
        $scope.lesson = lesson;
    });
    $scope.checkin = function(){
        console.log("checkin !");
    };
}]);
