angular.module('studionic', ['ionic','ngCordova','angularMoment','pickadate','permission','studionic.controllers','studionic.factories','studionic.values','studionic.directives','lbServices'])

.config(['$stateProvider','$urlRouterProvider','$logProvider','$httpProvider','$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('platform');
    $ionicConfigProvider.navBar.positionPrimaryButtons('platform');
    $ionicConfigProvider.navBar.positionSecondaryButtons('platform');
    $ionicConfigProvider.backButton.text(false);
    $ionicConfigProvider.backButton.previousTitleText(false);

    // Whether the application will log debug messages or not
    $logProvider.debugEnabled(true);

    $stateProvider.state('welcome', {
        url: "/welcome",
        templateUrl: "templates/welcome.html",
        controller: 'WelcomeCtrl',
        data: {
            permissions: {
                only: ['anonymous'],
                redirectTo: 'app.studlife'
            }
        }
    })
    .state('app', {
        url: "/app",
        abstract: true,
        template: '<ion-nav-bar class="bar bar-royal bar-md"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view name="main"></ion-nav-view>',
        controller: 'AppCtrl',
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'welcome'
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
}])

.run(['Permission','CustomUser', function(Permission, CustomUser){
    Permission.defineRole('anonymous', function (stateParams) {
        if (!CustomUser.isAuthenticated())
            return true;
        return false;
    });
}]);
