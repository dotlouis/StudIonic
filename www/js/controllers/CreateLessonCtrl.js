angular.module('studionic.controllers')

.controller('CreateLessonCtrl', ['$scope','$stateParams','CourseFactory','RoleFactory','RoomFactory', function($scope, $stateParams, CourseFactory, RoleFactory, RoomFactory){
    CourseFactory.getAll().then(function(courses){
        $scope.courses = courses;
        console.log(courses);
    });
    RoleFactory.getAll().then(function(groups){
        $scope.attendees = groups;
        console.log(groups);
    });
    RoleFactory.getTeachers().then(function(teachers){
        $scope.teachers = teachers;
        console.log(teachers);
    });
    RoomFactory.getAll().then(function(rooms){
        $scope.rooms = rooms;
        console.log(rooms);
    });
}]);
