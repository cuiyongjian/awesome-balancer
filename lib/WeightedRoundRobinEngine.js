var inherits = require('util').inherits;
var AbstractEngine = require('./AbstractEngine');
var RoundRobinEngine = require('./RoundRobinEngine');

module.exports = WeightedRoundRobinEngine;

function WeightedRoundRobinEngine(pool) {
    if (!(this instanceof WeightedRoundRobinEngine)) {
        return new WeightedRoundRobinEngine(pool);
    }
    var newPool = this.prepareNewPool(pool);
    RoundRobinEngine.call(this, newPool);
}

inherits(WeightedRoundRobinEngine, RoundRobinEngine);

WeightedRoundRobinEngine.prototype.prepareNewPool = function (pool) {
    // 对pool按照权重排序，并按照权重扩展其数量
    pool.sort(function (a, b) {
        return b.weight - a.weight;
    });
    var newPool = [];
    pool.forEach(function (item, index) {
        var realObject = null;
        // 错误校验
        if (item.value || item.object) {
            realObject = item.value || item.object;
        }
        else {
            throw new Error('请在第' + index + '个元素中添加object或value属性');
        }
        if (item.weight < 1 || (item.weight % 1 !== 0)) {
            throw Error('weight must greater than zero and tobe a integer');
        }
        for (var i = 0; i < item.weight; i++) {
            newPool.push(realObject);
        }
    });
    return newPool;
}
