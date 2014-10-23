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
        },
        getTeachers: function(){
            // TODO: add school to filter teachers of only one school
            var query = new Parse.Query(Parse.Role);
            query.equalTo('name','teacher');
            return query.first().then(function(teacherRole){
                return teacherRole.getUsers().query().find();
            });
        }
    });

    Object.defineProperty(Role.prototype, "name", {
        get: function() { return this.get("name"); },
        set: function(name) { this.set("name", name); }
    });

    Object.defineProperty(Role.prototype, "nickname", {
        get: function() { return this.get("nickname"); },
        set: function(nickname) { this.set("nickname", nickname); }
    });

    return Role;
}]);
