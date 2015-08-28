var expect = require('chai').expect;
var rose = require('../src/gilded_rose');

var Item = rose.Item;
var items = rose.items;
var update_quality = rose.update_quality;

describe('Gilded Rose', function() {
    var foo;

    beforeEach(function() {
        foo = 0;
    });

    afterEach(function() {
        foo = 0;
    });

    it('should do something', function() {

    });

    it('is a syntax example', function() {
        expect(true).to.be.true;
        expect(false).not.to.be.true;
    });

    describe('Nested specs', function() {
        it('is just a function, so it can contain any code', function() {
            var foo = 0;
            foo += 1;

            expect(foo).to.equal(1);
        });

        it('has mathematical comparisons', function() {
            expect(2).to.be.lessThan(3);
            expect(3).not.to.be.lessThan(2);
            expect(3).to.be.greaterThan(2);
            expect(2).not.to.be.greaterThan(3);
        });
    });

});
