angular.module('studionic', ['ionic','ngCordova','angularMoment','pickadate','studionic.controllers','studionic.factories','studionic.values','studionic.directives'])

.config(['$stateProvider','$urlRouterProvider','$logProvider','$httpProvider', function($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {

    // Whether the application will log debug messages or not
    $logProvider.debugEnabled(true);

    $stateProvider.state('welcome', {
        url: "/welcome",
        templateUrl: "templates/welcome.html",
        controller: 'WelcomeCtrl',
        resolve: {
            signedUser: function(User, $state, $q){
                if(User.isAuthenticated())
                    $state.go('app.studlife');
                return;
            }
        }
    })
    .state('app', {
        url: "/app",
        abstract: true,
        template: '<ion-nav-view name="main" animation="slide-left-right"></ion-nav-view>',
        controller: 'AppCtrl',
        resolve: {
            signedUser: function(User, $state, $q){
                if(!User.isAuthenticated())
                    $state.go('welcome');
                return;
            }
        }
    })
    .state('app.studlife', {
        url: "/studlife",
        views: {
            'main@app' :{
                templateUrl: "templates/studlife.html",
                controller: 'StudLifeCtrl'
            }
        }
    })
    .state('app.lesson', {
        // more security: https://github.com/angular-ui/ui-router/wiki/URL-Routing#regex-parameters
        url: "/lessons/:id",
        views: {
            'main@app' :{
                templateUrl: "templates/lesson.html",
                controller: 'LessonCtrl'
            }
        }
    })
    .state('app.profile', {
        url: "/profile",
        views: {
            'main@app' :{
                templateUrl: "templates/profile.html",
                controller: 'ProfileCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/studlife');


    // Handling errors
    // http://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-Handling401Unauthorized
    $httpProvider.interceptors.push(function($q, $location) {
        return {
            responseError: function(rejection) {
                // Server down or does not answer
                if(rejection.status == 0)
                    return $q.reject({message:"Can't reach the server", name:"Error", status: 0, statusCode: 0});
                return $q.reject(rejection.data.error);
            }
        };
    });
}]);
