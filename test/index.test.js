var expect = require('chai').expect;
var RandomEngine = require('../lib/RandomEngine');
var index = require('../index.js');


describe('Index入口检测: isEngine method to identify instances of engines', function () {
    it('for example: isEngine(RandomEngine) will be true', function () {
        var engine = new RandomEngine([1, 2, 3]);
        expect(index.isEngine(engine)).to.be.true;
    });
    it('for example: isEngine({}) is false', function () {
        var engine = {};
        expect(index.isEngine(engine)).to.be.false;
    });
});
