angular.module('studionic', ['ionic', 'studionic.controllers','studionic.factories'])

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
        signedUser: function(AuthFactory, $state){
          AuthFactory.currentUser().then(function(signedUser){
            $state.go('app.studlife');
          });
        }
      }
    })
    .state('app', {
      url: "/app",
      abstract: true,
      //templateUrl: "templates/menu.html",
      controller: 'AppCtrl',
      resolve: {
        signedUser: function(AuthFactory, $state){
          // The signed user is implicitly injected into the controller
          // because of the chaining of promises.
          // here we only describe the reject part but when it resolve it returns the
          // result of the parent promise.
          return AuthFactory.currentUser().catch(function(error){
            $state.go('welcome');
          });
        }
      }
    })
    .state('app.studlife', {
      url: "/studlife",
      views: {
        'main@' :{
          templateUrl: "templates/studlife.html",
          controller: 'StudLifeCtrl'
        }
      }
    })
    .state('app.profile', {
      url: "/profile",
      views: {
        'main@' :{
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/studlife');
}]);
