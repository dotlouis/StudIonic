angular.module('studionic.controllers')

.controller('ProfileCtrl', ['$scope','$cordovaCamera','UserFactory','SchoolFactory', function($scope, $cordovaCamera, UserFactory, SchoolFactory){

    SchoolFactory.get($scope.user.get('school').id).then(function(school){
        $scope.school = school;
        $scope.coverPicture = school.get('coverPicture').url();
        $scope.$apply();
    });

    $scope.updateProfilePicture = function(){
        $cordovaCamera.getPicture({
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            mediaType: navigator.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false
        }).then(function(imageData) {
            // immediately apply background image localy
            $scope.profilePicture = 'data:image/jpeg;base64,'+imageData;
            // save it to the cloud
            $scope.user.setProfilePicture(imageData);
        }, function(error) {
            console.log(error);
        });
    };

    $scope.updateCoverPicture = function(){
        if(!$scope.admin){
            console.log("Only admin can update the cover picture");
            return;
        }

        $cordovaCamera.getPicture({
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 500,
            mediaType: navigator.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false
        }).then(function(imageData) {
            // immediately apply background image localy
            $scope.coverPicture = 'data:image/jpeg;base64,'+imageData;
            // get the school object corresponding to the user
            SchoolFactory.get($scope.user.get('school').id).then(function(school){
                // save school object with cover picture to the cloud
                school.setCoverPicture(imageData);
            });
        }, function(error) {
            console.log(error);
        });
    };

}]);
