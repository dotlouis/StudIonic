angular.module('studionic.controllers')

.controller('ProfileCtrl', ['$scope','$cordovaCamera', function($scope, $cordovaCamera){


    $scope.updateProfilePicture = function(){
        $cordovaCamera.getPicture({
            quality: 75,
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 640,
            targetHeight: 640,
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
        if($scope.user.role.name != 'admin'){
            console.log("Only admin can update the cover picture");
            return;
        }

        $cordovaCamera.getPicture({
            quality: 75,
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 1080,
            targetHeight: 1920,
            mediaType: navigator.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false
        }).then(function(imageData) {
            // immediately apply background image localy
            $scope.user.school.coverPicture = 'data:image/jpeg;base64,'+imageData;
            // save school object with cover picture to the cloud
            $scope.user.school.setCoverPicture(imageData);
        }, function(error) {
            console.log(error);
        });
    };

}]);
