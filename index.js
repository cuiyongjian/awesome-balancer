var AbstractEngine = require('./lib/AbstractEngine');
var RandomEngine = module.exports.RandomEngine = require('./lib/RandomEngine');
var WeightedRoundRobin = module.exports.WeightedRoundRobin = require('./lib/WeightedRoundRobinEngine');
var RoundRobin = module.exports.RoundRobin = require('./lib/RoundRobinEngine');

// 随机
module.exports.random = module.exports.RandomEngine = require('./lib/RandomEngine');
// 轮询
module.exports.roundRobin = function (pool) {
    if (pool[0].weight) {
        return new WeightedRoundRobin(pool);
    }
    else {
        return new RoundRobin(pool);
    }
}

// 判断一个对象是否是引擎
module.exports.isEngine = function (engine) {
    return engine instanceof AbstractEngine;
};
