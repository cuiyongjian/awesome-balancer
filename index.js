var AbstractEngine = require('./lib/AbstractEngine');

// 随机
module.exports.random = module.exports.RandomEngine = require('./lib/RandomEngine');
// TODO: 轮询

// 判断一个对象是否是引擎
module.exports.isEngine = function (engine) {
    return engine instanceof AbstractEngine;
};
