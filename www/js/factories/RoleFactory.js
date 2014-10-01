angular.module('studionic.factories')

// Extends Parse.Role
.factory('RoleFactory', [function(){

    var Role = Parse.Role.extend(
    // Instance methods
    {}
    // Class methods
    ,{
        getAll: function(){
            var query = new Parse.Query(Parse.Role);
            return query.find().then(function(roles){
                // do some stuff with roles
                return roles;
            });
        }
    });

    return Role;
}]);
