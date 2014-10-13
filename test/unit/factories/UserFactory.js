'use strict';

// a spec suite
describe("Unit: UserFactory", function(){

    var UserFactory, $rootScope;

    beforeEach(function(){

        // instanciate the module before each spec
        module("studionic.factories");

        inject(function(_$rootScope_, _UserFactory_){
            $rootScope = _$rootScope_;
            UserFactory = _UserFactory_;
        });

    });

    // a spec
    it("should be defined", function(){
        expect(UserFactory).toBeDefined();
    });

    describe("current()", function(){
        var successCallback, errorCallback;

        beforeEach(function() {
            successCallback = jasmine.createSpy('success');
            errorCallback   = jasmine.createSpy('error');
        });

        it("should resolve if Parse.User.current() returns a User", function(){

            // we track Parse.User.current() and return "Some User" when called
            spyOn(Parse.User, 'current').and.returnValue("Some User");

            // we actually call the method we want to test and give it tracked callbacks
            // to check wich one was called
            UserFactory.current().then(successCallback, errorCallback);

            // automatically flush the promises. Otherwise it does not resolve nor reject
            $rootScope.$digest();

            // we check if UserFactory.current() is actually calling Parse.User.current()
            expect(Parse.User.current).toHaveBeenCalled();
            // Given we mocked a return value "Some User" we expect the tracked
            // successCallback to have been called once while the errorCallback
            // not to have been called
            expect(successCallback.calls.count()).toBe(1);
            expect(errorCallback.calls.count()).toBe(0);

        });

        it("should reject if Parse.User.current() returns NO User (ie: undefined)", function(){
            spyOn(Parse.User, 'current').and.returnValue(undefined);
            UserFactory.current().then(successCallback, errorCallback);
            $rootScope.$digest();
            expect(Parse.User.current).toHaveBeenCalled();
            expect(errorCallback.calls.count()).toBe(1);
            expect(successCallback.calls.count()).toBe(0);
        });
    });
});
