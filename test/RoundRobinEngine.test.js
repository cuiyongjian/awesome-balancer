var expect = require('chai').expect;
var RoundRobinEngine = require('../lib/RoundRobinEngine');


describe('RoundRobinEngine', function () {
    it('constructor is also a factory method', function () {
        var pool = ['192.168.1.1','192.168.1.2'];
        expect(RoundRobinEngine(pool)).to.be.an.instanceof(RoundRobinEngine);
    });

    var PICK_SIZE = 100000;
    this.timeout(50000);
    var pool = ['a', 'b', 'c', 'd'];
    it('选取'+PICK_SIZE+'个元素出来，看看是不是依次等于abcd并一直是这几个字母', function () {
        var engine = new RoundRobinEngine(pool);
        for (var i = 0; i < PICK_SIZE; i++) {
            var mod = i % pool.length;
            var pickEle = engine.pick();
            expect(pickEle).to.equal(pool[mod]);
            expect(pool).to.include(pickEle);
        }
    });
});
