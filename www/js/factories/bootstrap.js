// This instantiate the "factories" module (note the second parameter)
// http://crossplatform.net/modularizing-your-angularjs-code/
angular.module('studionic.factories', [])


.run([function(){
    // initialized parse with JS SDK key and app key.
    Parse.initialize("kM564gKOHtrqKdpby7lPyodnot5Pdg2o9z9XgHk5", "r0q04g2xEKVSzkOHmoQtzFLokP4pU2qZHXSaGQlp");
}]);
