angular.module('studionic.factories')

// Extends Parse.Object('Room')
.factory('RoomFactory', [function(){

    var Room = Parse.Object.extend('Room',
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query('Room');
            return query.find().then(function(rooms){
                // do some stuff with rooms
                return rooms;
            });
        },
        // Overrides
        get: function(id){
            var query =	new Parse.Query('Room');
            return query.get(id).then(function(room){
                // do some stuff with room
                return room;
            });
        }
    });

    return Room;
}]);
