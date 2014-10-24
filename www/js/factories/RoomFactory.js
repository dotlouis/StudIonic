angular.module('studionic.factories')

// Extends Parse.Object('Room')
.factory('RoomFactory', [function(){

    var Room = Parse.Object.extend('Room',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query(this);
            return query.find().then(function(rooms){
                // do some stuff with rooms
                return rooms;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query(this);
            return query.get(id).then(function(room){
                // do some stuff with room
                return room;
            });
        }
    });

    Object.defineProperty(Room.prototype, "name", {
        get: function() { return this.get("name"); },
        set: function(name) { this.set("name", name); }
    });

    Object.defineProperty(Room.prototype, "type", {
        get: function() { return this.get("type"); },
        set: function(type) { this.set("type", type); }
    });

    Object.defineProperty(Room.prototype, "nickname", {
        get: function() { return this.get("nickname"); },
        set: function(nickname) { this.set("nickname", nickname); }
    });

    Object.defineProperty(Room.prototype, "fullname", {
        get: function() { return this.get("fullname"); },
        set: function(fullname) { this.set("fullname", fullname); }
    });

    return Room;
}]);
