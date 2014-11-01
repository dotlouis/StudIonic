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
            query.include('speaker');
            query.include('room');
            query.include('attendees');
            return query.get(id).then(function(lesson){
                // do some stuff with lesson
                return lesson;
            });
        },
        getForAttendees: function(attendees){
            var query = new Parse.Query(this);
            query.include('course');
            query.include('speaker');
            query.include('room');
            query.equalTo('attendees', attendees);
            return query.find();
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

    Object.defineProperty(Lesson.prototype, "speaker", {
        get: function() { return this.get("speaker"); },
        set: function(speaker) { this.set("speaker", speaker); }
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
