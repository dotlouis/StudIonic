angular.module('studionic.factories')

// Extends Parse.Object('School')
.factory('SchoolFactory', ['$q', function($q){

    var School = Parse.Object.extend('School',
    // Instance methods
    {
        setCoverPicture: function(imageData){
            var deferred = $q.defer();
            var school = this;
            var coverPicture = new Parse.File("cover_picture.jpg", { base64: imageData });
            // first save the file itself
            coverPicture.save().then(function(savedFile) {
                // then associate the file with the school coverPicture property
                school.set("coverPicture", coverPicture);
                school.save().then(function(school){
                    // return savedFile
                      deferred.resolve(savedFile);
                }, function(error){
                      console.log(error);
                      deferred.reject(error);
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
    });

    Object.defineProperty(School.prototype, "nickname", {
        get: function() { return this.get("nickname"); },
        set: function(nickname) { this.set("nickname", nickname); }
    });

    Object.defineProperty(School.prototype, "name", {
        get: function() { return this.get("name"); },
        set: function(name) { this.set("name", name); }
    });

    Object.defineProperty(School.prototype, "coverPicture", {
        get: function() { return this.get("coverPicture"); },
        set: function(coverPicture) { this.set("coverPicture", coverPicture); }
    });

    Object.defineProperty(School.prototype, "emailPattern", {
        get: function() { return this.get("emailPattern"); },
        set: function(emailPattern) { this.set("emailPattern", emailPattern); }
    });

    return School;
}]);
