/*
    http://www.whatibroke.com/?p=899
*/

angular.module('studionic.directives')

.directive("ngTimeSelector", function () {
    return {
        restrict: 'EA',
        template: '<div class="timeSelectorDirective"> <div class="section hours"> <div class="increase" ng-click="increaseHours()"> <i class="ion-arrow-up-b"></i> </div> <div class="display"> {{displayHours()}} </div> <div class="decrease" ng-click="decreaseHours()"> <i class="ion-arrow-down-b"></i> </div> </div> <div class="section minutes"> <div class="increase" ng-click="increaseMinutes()"> <i class="ion-arrow-up-b"></i> </div> <div class="display"> {{displayMinutes()}} </div> <div class="decrease" ng-click="decreaseMinutes()"> <i class="ion-arrow-down-b"></i> </div> </div> <div class="section hours"> <div class="increase" ng-click="switchPeriod()"> <i class="ion-arrow-up-b"></i> </div> <div ng-if="hours >= 12" class="display"> PM </div> <div ng-if="hours < 12" class="display"> AM </div> <div class="decrease" ng-click="switchPeriod()"> <i class="ion-arrow-down-b"></i> </div> </div> </div>',
        scope: {
            hours: "=",
            minutes: "="
        },
        replace: true,
        link: function (scope, elem, attr) {

            //Create vars
            scope.period = "AM";

            /* Increases hours by one */
            scope.increaseHours = function () {

                //Check whether hours have reached max
                if (scope.hours < 23) {
                    scope.hours = ++scope.hours;
                }
                else {
                    scope.hours = 0;
                }
            }

            /* Decreases hours by one */
            scope.decreaseHours = function () {

                //Check whether hours have reached min
                scope.hours = scope.hours <= 0 ? 23 : --scope.hours;
            }

            /* Increases minutes by one */
            scope.increaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes >= 59) {
                    scope.minutes = 0;
                }
                else {
                    scope.minutes++;
                }
            }

            /* Decreases minutes by one */
            scope.decreaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes <= 0) {
                    scope.minutes = 59;
                }
                else {
                    scope.minutes = --scope.minutes;
                }
            }


            /* Displays hours - what the user sees */
            scope.displayHours = function () {

                //Create vars
                var hoursToDisplay = scope.hours;

                //Check whether to reset etc
                if (scope.hours > 12) {
                    hoursToDisplay = scope.hours - 12;
                }

                //Check for 12 AM etc
                if (hoursToDisplay == 0) {

                    //Set to am and display 12
                    hoursToDisplay = 12;
                }
                else {

                    //Check whether to prepend 0
                    if (hoursToDisplay <= 9) {
                        hoursToDisplay = "0" + hoursToDisplay;
                    }
                }

                return hoursToDisplay;
            }

            /* Displays minutes */
            scope.displayMinutes = function () {
                return scope.minutes <= 9 ? "0" + scope.minutes : scope.minutes;
            }

            /* Switches the current period by ammending hours */
            scope.switchPeriod = function () {
                scope.hours = scope.hours >= 12 ? scope.hours - 12 : scope.hours + 12;
            }
        }
    }
});
