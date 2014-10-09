'use strict';

// a spec suite
describe("Unit: UserFactory", function(){

    var UserFactory;

    beforeEach(function(){

        // instanciate the module before each spec
        module("studionic.factories");

        inject(function(_UserFactory_){
            UserFactory = _UserFactory_;
        });

    });

    // a spec
    it("should return current User", function(){
        var a = true;
        expect(a).toBeTruthy();
    });
});
