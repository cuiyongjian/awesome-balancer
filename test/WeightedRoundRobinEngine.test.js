var expect = require('chai').expect;
var WeightedRoundRobinEngine = require('../lib/WeightedRoundRobinEngine');
var AbstractEngine = require('../lib/AbstractEngine');

describe('WeightedRoundRobinEngine', function () {
    this.timeout(50000);
    var pool = ['a', 'b', 'c', 'd'];
    var PICK_SIZE = 10000;
    it('pick ' + PICK_SIZE + 'from pool using weighted round robin', function () {
        var poolWithWeight = [];
        pool.forEach(function (item, index) {
            poolWithWeight.push({
                object: item,
                weight: index + 1
            });
        });
        var expected = ['d', 'd', 'd', 'd', 'c', 'c', 'c','b', 'b', 'a'];
        var engine = new WeightedRoundRobinEngine(poolWithWeight);
        for (var i = 0; i < PICK_SIZE; i++) {
            var mod = i % expected.length;
            var pickItem = engine.pick();
            expect(pool).to.include(pickItem);
            expect(pickItem).to.equal(expected[mod]);
        }
    });

    it('entries must contain an "object" property', function () {
        var poolWithWeights = [{
            weight: 1
        }]

        expect(function () {
            var engine = new WeightedRoundRobinEngine(poolWithWeights)
        }).to.throw('请在第' + 0 + '个元素中添加object或value属性')
    });

    it('entries "value" property is an alias to object property', function () {
        var poolWithWeights = [{
            weight: 1,
            value: 'a'
        }]

        expect(function () {
            var engine = new WeightedRoundRobinEngine(poolWithWeights)
        }).not.to.throw()
    });

    it('weights must be integers', function () {
        var poolWithWeights = [{
            weight: 0.2,
            object: 'a'
        }]

        expect(function () {
            var engine = new WeightedRoundRobinEngine(poolWithWeights)
        }).to.throw('weight must greater than zero and tobe a integer')
    });
    it('weights must greater than zero', function () {
        var poolWithWeights = [{
            weight: 0,
            object: 'a'
        }]

        expect(function () {
            var engine = new WeightedRoundRobinEngine(poolWithWeights)
        }).to.throw('weight must greater than zero and tobe a integer')
    })

    it('constructor is also a factory method', function () {
        var pool = [{
            weight: 1,
            value: '192.168.1.1'
        }];
        expect(WeightedRoundRobinEngine(pool)).to.be.an.instanceof(WeightedRoundRobinEngine);
    });
});
