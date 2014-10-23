// This is only a reference to the "factories" module (no second parameter)
// http://crossplatform.net/modularizing-your-angularjs-code/
angular.module('studionic.factories')

// Extends Parse.User
.factory('UserFactory', ['$q','RoleFactory','SchoolFactory', function($q, RoleFactory, SchoolFactory){

    var User = Parse.User.extend(
    // Instance methods
    {
        // called at object creation
        // https://parse.com/docs/js/symbols/Parse.Object.html#.extend
        initialize: function(){
            var self = this;
        },
        // For now the first role is the one
        getRole: function(){
            var query = new Parse.Query(RoleFactory);
            query.equalTo("users", this);
            return query.first();
        },
        // For now the first school is the one
        getSchool: function(){
            var query = new Parse.Query(SchoolFactory);
            query.equalTo("users", this);
            return query.first();
        },
        isAdmin: function(){
            var query = new Parse.Query(RoleFactory);
            query.equalTo("name", "admin");
            query.equalTo("users", this);
            return query.first().then(function(adminRole) {
                if (adminRole)
                    return true;
                else
                    return false;
            });
        },
        setProfilePicture: function(imageData){
            var deferred = $q.defer();
            var user = this;
            var profilePicture = new Parse.File("profile_picture.jpg", { base64: imageData });
            // first save the file itself
            profilePicture.save().then(function(savedFile) {
                // then associate the file with the user profilePicture property
                user.set("profilePicture", profilePicture);
                user.save().then(function(){
                    // return savedFile
                      deferred.resolve(savedFile);
                });
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
    // Class methods
    ,{
        // Overrides
        current: function(){
            var deferred = $q.defer();
            var currentUser = Parse.User.current();

            if(currentUser){
                var p2 = currentUser.getRole();
                var p3 = currentUser.getSchool();

                Parse.Promise.when(p2,p3).then(function(role, school){
                    currentUser.school = school;
                    currentUser.role = role;
                    deferred.resolve(currentUser);
                });

            }
            else
                deferred.reject("No current user");

            return deferred.promise;
        }
    });

    // Allows to use Parse.Object like any angular object
    // by using properties instead of getters and setter
    // http://josebolanos.wordpress.com/2013/09/30/5-tips-for-using-parse-with-angularjs/
    Object.defineProperty(User.prototype, "username", {
        get: function() { return this.get("username"); },
        set: function(username) { this.set("username", username); }
    });

    Object.defineProperty(User.prototype, "nickname", {
        get: function() { return this.get("nickname"); },
        set: function(nickname) { this.set("nickname", nickname); }
    });

    Object.defineProperty(User.prototype, "email", {
        get: function() { return this.get("email"); },
        set: function(email) { this.set("email", email); }
    });

    Object.defineProperty(User.prototype, "fullname", {
        get: function() { return this.get("fullname"); },
        set: function(fullname) { this.set("fullname", fullname); }
    });

    Object.defineProperty(User.prototype, "grade", {
        get: function() { return this.get("grade"); },
        set: function(grade) { this.set("grade", grade); }
    });

    Object.defineProperty(User.prototype, "profilePicture", {
        get: function() { return this.get("profilePicture"); },
        set: function(profilePicture) { this.set("profilePicture", profilePicture); }
    });

    return User;

}]);
