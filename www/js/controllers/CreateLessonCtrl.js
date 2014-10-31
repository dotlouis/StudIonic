angular.module('studionic.controllers')

.controller('CreateLessonCtrl', ['$scope','$stateParams','CourseFactory','RoleFactory','RoomFactory','LessonFactory', function($scope, $stateParams, CourseFactory, RoleFactory, RoomFactory, LessonFactory){

    $scope.selectedCourse;
    $scope.selectedAttendee;
    $scope.selectedTeacher;
    $scope.selectedRoom;
    $scope.selectedDate;

    CourseFactory.getAll().then(function(courses){
        $scope.courses = courses;
    });
    RoleFactory.getAll().then(function(groups){
        $scope.attendees = groups;
    });
    RoleFactory.getTeachers().then(function(teachers){
        $scope.teachers = teachers;
    });
    RoomFactory.getAll().then(function(rooms){
        $scope.rooms = rooms;
    });

    $scope.saveLesson = function(){
        var lesson = new LessonFactory;

        try{
            if(!this.selectedCourse)
                throw "Please select a Course";
            if(!this.selectedAttendee)
                throw "Please select an Attendee";
            if(!this.selectedTeacher)
                throw "Please select a Teacher";
            if(!this.selectedRoom)
                throw "Please select a Room";
            if(!this.selectedDate)
                throw "Please select a Date";

            // lesson start tomorrow at 8AM and ends 2 hours later
            lesson.start = moment(this.selectedDate).startOf('day').add(9, 'hours').toDate();
            lesson.end = moment(lesson.start).add(2,'hours').toDate();

            lesson.relation("course").add(this.selectedCourse);
            lesson.relation("attendees").add(this.selectedAttendee);
            lesson.relation("speakers").add(this.selectedTeacher);
            lesson.relation("room").add(this.selectedRoom);
            lesson.save().then(function(lessonAgain){
                $scope.createLessonModal.hide();
            });
        }catch(error){alert(error);}
    };

}]);
