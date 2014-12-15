angular.module('studionic.factories')

.factory('Setting', ['$q','DefaultSettings', function($q, DefaultSettings){
    return {
        key: function(index){
            var deferred = $q.defer();
            var keyName = window.localStorage.key(index);
            deferred.resolve(keyName);
            return deferred.promise;
        },
        get: function(key){
            var deferred = $q.defer();
            var value = JSON.parse(window.localStorage.getItem(key) || {});
            deferred.resolve(value);
            return deferred.promise;
        },
        set: function(key, value){
            window.localStorage.setItem(key,JSON.stringify(value));
        },
        remove: function(key){
            window.localStorage.removeItem(key);
        },
        clear: function(){
            window.localStorage.clear();
        },
        setDefault: function(){
            this.set('settings',DefaultSettings);
        }
    }
}]);
