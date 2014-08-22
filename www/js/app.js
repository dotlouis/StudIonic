angular.module('studionic', ['ionic', 'studionic.controllers','studionic.factories'])

.run(function($ionicPlatform) {

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
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('welcome', {
      url: "/welcome",
      templateUrl: "templates/welcome.html",
      controller: 'WelcomeCtrl',
      resolve: {
        signedUser: function(AuthFactory, $state){
          AuthFactory.currentUser().then(function(signedUser){
            console.log("Logged In !");
            console.log("signedUser");
            //$state.go('app.studlife');
          }, function(error){console.log("Not signed in"); console.log(error);});
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
});