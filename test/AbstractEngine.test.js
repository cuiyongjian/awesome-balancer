var expect = require('chai').expect;
var AbstractEngine = require('../lib/AbstractEngine');


describe('AbstractEngine', function () {
    it('constructor is also a factory method', function () {
        var engine = AbstractEngine();
        expect(engine).to.be.an.instanceof(AbstractEngine);
    });
});
