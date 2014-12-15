angular.module('studionic.controllers')

.controller('StudLifeCtrl',['$scope','$ionicModal', function($scope, $ionicModal){

    // $scope.lessons;

    // if($scope.user.isAdmin){
    //     $ionicModal.fromTemplateUrl('templates/createLesson.html', {
    //         scope: $scope,
    //         animation: 'slide-in-up'
    //     }).then(function(modal) {
    //         $scope.createLessonModal = modal;
    //     },function(error){console.log(error);});
    //
    //     //Cleanup the modal when we're done with it!
    //     $scope.$on('$destroy', function() {
    //           $scope.createLessonModal.remove();
    //     });
    // }

    // Lesson.getForAttendees($scope.user.role).then(function(lessons){
    //     $scope.lessons = lessons;
    // });

    // $scope.fetchIcal = function(){
    //     Parse.Cloud.run('parseCalendar').then(function(events){
    //         var today = new Date();
    //         for( var i in events){
    //             var e = events[i]
    //             if(e.start.getDate()==today.getDate() && e.start.getMonth()==today.getMonth()){
    //                 console.log(e);
    //                 var desc = e.description.substring(1);
    //                 var speaker = desc.substring(0, desc.indexOf('\n'));
    //                 console.log("speaker: "+speaker);
    //
    //                 /* var lesson = new Lesson();
    //                 lesson.save({
    //                     start: e.start,
    //                     end: e.end,
    //                     teacher:
    //                 })*/
    //             }
    //         }
    //         },
    //         function(error) {
    //             console.log(error);
    //         });
    // };

}]);
