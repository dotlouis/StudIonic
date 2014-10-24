angular.module('studionic.factories')

// Extends Parse.Object('Course')
.factory('CourseFactory', [function(){

    var Course = Parse.Object.extend('Course',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query(this);
            return query.find().then(function(courses){
                // do some stuff with courses
                return courses;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query(this);
            return query.get(id).then(function(course){
                // do some stuff with course
                return course;
            });
        }
    });

    Object.defineProperty(Course.prototype, "name", {
        get: function() { return this.get("name"); },
        set: function(name) { this.set("name", name); }
    });

    Object.defineProperty(Course.prototype, "description", {
        get: function() { return this.get("description"); },
        set: function(description) { this.set("description", description); }
    });

    return Course;
}]);
