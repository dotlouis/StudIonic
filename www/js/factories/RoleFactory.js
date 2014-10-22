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

    return Role;
}]);
