// This is only a reference to the "factories" module (no second parameter)
// http://crossplatform.net/modularizing-your-angularjs-code/
angular.module('studionic.factories')

// Extends Parse.User
.factory('UserFactory', ['$q', function($q){

    var User = Parse.User.extend(
    // Instance methods
    {
        getRoles: function(){
            var query = new Parse.Query(Parse.Role);
            query.equalTo("users", this);
            return query.find();
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
            if(currentUser)
                deferred.resolve(currentUser);
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

    return User;

}]);
