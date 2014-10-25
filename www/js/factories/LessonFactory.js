angular.module('studionic.factories')

// Extends Parse.Object('Lesson')
.factory('LessonFactory', [function(){

    var Lesson = Parse.Object.extend('Lesson',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query(this);
            query.include('course');
            return query.find().then(function(lessons){
                // do some stuff with lessons
                return lessons;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query(this);
            query.include('course');
            return query.get(id).then(function(lesson){
                // do some stuff with lesson
                return lesson;
            });
        }
    });

    Object.defineProperty(Lesson.prototype, "start", {
        get: function() { return this.get("start"); },
        set: function(start) { this.set("start", start); }
    });

    Object.defineProperty(Lesson.prototype, "end", {
        get: function() { return this.get("end"); },
        set: function(end) { this.set("end", end); }
    });

    Object.defineProperty(Lesson.prototype, "assignements", {
        get: function() { return this.get("assignements"); },
        set: function(assignements) { this.set("assignements", assignements); }
    });

    Object.defineProperty(Lesson.prototype, "speakers", {
        get: function() { return this.get("speakers"); },
        set: function(speakers) { this.set("speakers", speakers); }
    });

    Object.defineProperty(Lesson.prototype, "attendees", {
        get: function() { return this.get("attendees"); },
        set: function(attendees) { this.set("attendees", attendees); }
    });

    Object.defineProperty(Lesson.prototype, "room", {
        get: function() { return this.get("room"); },
        set: function(room) { this.set("room", room); }
    });

    Object.defineProperty(Lesson.prototype, "course", {
        get: function() { return this.get("course"); },
        set: function(course) { this.set("course", course); }
    });

    return Lesson;

}]);
