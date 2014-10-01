angular.module('studionic.factories')

// Extends Parse.Object('Course')
.factory('CourseFactory', [function(){

    var Course = Parse.Object.extend('Course',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query('Course');
            return query.find().then(function(courses){
                // do some stuff with courses
                return courses;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query('Course');
            return query.get(id).then(function(course){
                // do some stuff with course
                return course;
            });
        }
    });

    return Course;
}]);
