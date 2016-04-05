var RandomEngine = require('../lib/RandomEngine');
var expect = require('chai').expect;


describe('RandomEngine', function () {
    this.timeout(50000);
    var pool = ['a', 'b', 'c', 'd'];
    var TEST_SIZE = 10000;
    it('pick ' + TEST_SIZE + ' elements from the pool.', function () {
        var engine = new RandomEngine(pool);
        var results = {};
        for (var i = 0; i < pool.length; i++) {
            results[pool[i]] = 0;
        }
        // 验证选中的对象属于对象池
        for (var i = 0; i < TEST_SIZE; i++) {
            var elem = engine.pick();
            expect(pool).to.include(elem);
            results[elem]++;
        }

        // 验证选中的对象总体概率是否正确
        Object.keys(results).forEach(function (key) {
            var rate = results[key] / TEST_SIZE;
            expect(rate).to.above(0.24);
            expect(rate).to.below(0.26);
        });
    });

    it('accept a seed to be used for repeating random pick series', function () {
        var engine1 = new RandomEngine(pool, 1);
        var engine2 = new RandomEngine(pool, 1);
        for (var i = 0; i < TEST_SIZE; i++) {
            var pick1 = engine1.pick();
            var pick2 = engine2.pick();
            expect(pick1).to.equal(pick2);
        }
    });

    it('constructor is also a factory method', function () {
        var engine = RandomEngine(pool);
        expect(engine).to.be.an.instanceof(RandomEngine);
    });
});
