angular.module('studionic.factories')

// Extends Parse.Object('Lesson')
.factory('LessonFactory', [function(){

    var Lesson = Parse.Object.extend('Lesson',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query('Lesson');
            query.include('course');
            return query.find().then(function(lessons){
                // do some stuff with lessons
                return lessons;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query('Lesson');
            query.include('course');
            return query.get(id).then(function(lesson){
                // do some stuff with lesson
                return lesson;
            });
        }
    });

    return Lesson;

}]);
