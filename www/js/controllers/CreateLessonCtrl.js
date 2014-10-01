angular.module('studionic.controllers')

.controller('CreateLessonCtrl', ['$scope','$stateParams','CourseFactory','RoleFactory', function($scope, $stateParams, CourseFactory, RoleFactory){
    CourseFactory.getAll().then(function(courses){
        $scope.courses = courses;
        console.log(courses);
        $scope.$apply();
    });
    RoleFactory.getAll().then(function(groups){
        $scope.attendees = groups;
        console.log(groups);
        $scope.$apply();
    });
}]);
