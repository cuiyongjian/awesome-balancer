var expect = require('chai').expect;
var RandomEngine = require('../lib/RandomEngine');
var index = require('../index.js');
var RoundRobinEngine = require('../lib/RoundRobinEngine');
var WeightedRoundRobinEngine = require('../lib/WeightedRoundRobinEngine');



describe('index: 看看RoundRobin工厂函数能不能根据传入的pool对象池来返回特定的引擎', function () {
    it('例如，传入一个不带weight属性的池子', function () {
        var pool = ['a', 'b', 'c', 'd'];
        var result = index.roundRobin(pool);
        expect(result).to.be.an.instanceof(RoundRobinEngine);
    });

    it('例如，传入一个带weight属性的池子,应该返回带权重的RoundRobin引擎', function () {
        var pool = [{value: 'a', weight: 1}];
        expect(index.roundRobin(pool)).to.be.an.instanceof(WeightedRoundRobinEngine);
    });
});



describe('index: Index入口检测: isEngine method to identify instances of engines', function () {
    it('for example: isEngine(RandomEngine) will be true', function () {
        var engine = new RandomEngine([1, 2, 3]);
        expect(index.isEngine(engine)).to.be.true;
    });
    it('for example: isEngine({}) is false', function () {
        var engine = {};
        expect(index.isEngine(engine)).to.be.false;
    });
});
