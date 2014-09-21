angular.module('studionic', ['ionic','ngCordova','studionic.controllers','studionic.factories','studionic.values','studionic.directives'])

.run(['$ionicPlatform', function($ionicPlatform) {

  Parse.initialize("kM564gKOHtrqKdpby7lPyodnot5Pdg2o9z9XgHk5", "r0q04g2xEKVSzkOHmoQtzFLokP4pU2qZHXSaGQlp");

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider','$urlRouterProvider','$logProvider', function($stateProvider, $urlRouterProvider, $logProvider) {
  
  // Whether the application will log debug messages or not
  $logProvider.debugEnabled(true);

  $stateProvider.state('welcome', {
      url: "/welcome",
      templateUrl: "templates/welcome.html",
      controller: 'WelcomeCtrl',
      resolve: {
        signedUser: function(UserFactory, $state){
          UserFactory.current().then(function(signedUser){
            $state.go('app.studlife');
          });
        }
      }
    })
    .state('app', {
      url: "/app",
      abstract: true,
      //templateUrl: "templates/menu.html",
      template: '<ion-nav-view name="main" animation="slide-left-right"></ion-nav-view>',
      controller: 'AppCtrl',
      resolve: {
        signedUser: function(UserFactory, $state){
          // The signed user is implicitly injected into the controller
          // because of the chaining of promises.
          // here we only describe the reject part but when it resolve it returns the
          // result of the parent promise.
          return UserFactory.current().catch(function(error){
            $state.go('welcome');
          });
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
    .state('app.course', {
      // more security: https://github.com/angular-ui/ui-router/wiki/URL-Routing#regex-parameters
      url: "/courses/:id",
      views: {
        'main@app' :{
          templateUrl: "templates/course.html",
          controller: 'CourseCtrl'
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
}]);
