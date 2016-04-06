var expect = require('chai').expect;
var RoundRobinEngine = require('../lib/RoundRobinEngine');


describe('RoundRobinEngine', function () {
    it('constructor is also a factory method', function () {
        var pool = ['192.168.1.1','192.168.1.2'];
        expect(RoundRobinEngine(pool)).to.be.an.instanceof(RoundRobinEngine);
    });
});
