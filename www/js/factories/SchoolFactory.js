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

    return School;
}]);
