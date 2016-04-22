// 抽象构造器
var AbstractEngine = module.exports.AbstractEngine = require('./lib/AbstractEngine');
// 随机函数API和随机构造器
module.exports.random = module.exports.RandomEngine = require('./lib/RandomEngine');
// 轮询构造器
var WeightedRoundRobinEngine = module.exports.WeightedRoundRobinEngine = require('./lib/WeightedRoundRobinEngine');
var RoundRobinEngine = module.exports.RoundRobinEngine = require('./lib/RoundRobinEngine');
// 动态函数和动态构造器
module.exports.dynamicWeightedEngine = module.exports.DynamicWeightedEngine = require('./lib/DynamicWeightedEngine');
// 业务区分函数和业务区分构造器
module.exports.businessDivision = module.exports.BusinessDivisionEngin = require('./lib/BusinessDivisionEngine');


// 轮询函数API
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
