var expect = require('chai').expect;
var BusinessDivisionEngine = require('../lib/BusinessDivisionEngine');
var AbstractEngine = require('../lib/AbstractEngine');

describe('BusinessDivisionEngine', function () {
    this.timeout(50000);
    var pool = [{
            type: 'abc',
            value: 'a'
        },
        {
            type: 'def',
            value: 'b'
        },
        {
            type: 'abc',
            value: 'c'
        },
        {
            type: 'def',
            value: 'd'
        }];
    var PICK_SIZE = 10;
    it('pick ' + PICK_SIZE + 'from pool using BusinessDivisionEngine', function () {
        var queue = ['abc', 'abc', 'abc', 'def', 'abc', 'def'];
        var expected = ['a', 'c', 'a', 'b', 'c', 'd'];
        var engine = new BusinessDivisionEngine(pool, 'RoundRobinEngine');
        for (var i = 0; i < queue.length; i++) {
            var type = queue[i];
            var pickItem = engine.pick(type);
            expect(expected).to.include(pickItem);
            expect(pickItem).to.equal(expected[i]);
        }
    });

    it('constructor is also a factory method', function () {
        var pool = [{
            type: 'abc',
            value: '192.168.1.1'
        }];
        expect(BusinessDivisionEngine(pool, 'RandomEngine')).to.be.an.instanceof(BusinessDivisionEngine);
    });
});
