angular.module('studionic.controllers')

.controller('CreateLessonCtrl', ['$scope','$stateParams','CourseFactory','RoleFactory','RoomFactory','LessonFactory', function($scope, $stateParams, CourseFactory, RoleFactory, RoomFactory, LessonFactory){

    $scope.selectedCourse;
    $scope.selectedAttendee;
    $scope.selectedTeacher;
    $scope.selectedRoom;
    $scope.selectedDate;
    var now = moment();
    $scope.startHours = now.hours();
    $scope.startMinutes = now.minutes();
    $scope.endHours = moment(now).add(2, 'hours').hours();
    $scope.endMinutes = now.minutes();

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
            lesson.start = moment(this.selectedDate).hours(this.startHours).minutes(this.startMinutes).toDate();
            lesson.end = moment(this.selectedDate).hours(this.endHours).minutes(this.endMinutes).toDate();

            lesson.course = this.selectedCourse;
            lesson.attendees = this.selectedAttendee;
            lesson.speaker = this.selectedTeacher;
            lesson.room = this.selectedRoom;
            $scope.createLessonModal.hide();
            lesson.save();
        }catch(error){alert(error);}
    };

}]);
