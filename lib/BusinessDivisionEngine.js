var inherits = require('util').inherits;
var AbstractEngine = require('../lib/AbstractEngine');
var debug = require('debug')('awesomeBalancer:business');


module.exports = BusinessDivisionEngine;

/**
 * 业务区分的负载均衡引擎。
 * @poll 资源池
 *
 */

function BusinessDivisionEngine(pool, engineName) {
    // 要求pool里面有对应的业务类型type. 如果pool元素中有weight属性则使用加权轮询，没有则用基本轮询。
    if (!(this instanceof BusinessDivisionEngine)) {
        return new BusinessDivisionEngine(pool);
    }
    if (!engineName) {
        engineName = 'RandomEngine';
    }
    AbstractEngine.call(this, pool);
    // 按照不同type对目标节点进行分组。
    this._groupPool = {}; // 分组map数据结构
    var me = this;
    pool.forEach(function (item) {
        // 验证
        if (!item.type) {
            throw new Error('本引擎需要元素节点具有type属性');
        }
        var type = item.type;
        item = (item.weight === undefined) ? (item.value) : (item);
        console.log(item, '&&&&&&&&');
        if (!me._groupPool[type]) {
            me._groupPool[type] = [item];
        }
        else {
            me._groupPool[type].push(item);
        }
    });
    this._poolEngines = {};
    // 给每个类型的pool创建一个负载均衡引擎
    Object.keys(this._groupPool).forEach(function (type) {
        console.log('进来了');
        var oneTypePool = me._groupPool[type];
        console.log(oneTypePool);
        me._poolEngines[type] = createEngine(oneTypePool, engineName);
    });
}

inherits(BusinessDivisionEngine, AbstractEngine);

// 根据type对该type的机器进行RoundRobin
BusinessDivisionEngine.prototype.pick = function (type) {
    debug('传入的type为： ' + type);
    if (!type) {
        // 如果没有传入type，就随机选一个
        var engineTypes = Object.keys(this._poolEngines);
        var len = engineTypes.length;
        var randomIndex = Math.floor((len) * Math.random());
        debug(randomIndex);
        type = engineTypes[randomIndex];
    }

    var poolEngine = this._poolEngines[type];
    return poolEngine.pick();
}


function createEngine(pool, engineName) {
    console.log(pool, engineName);
    if (pool.length < 1) {
        throw Error('pool lenght must greater than zero');
    }
    var Engine = require('./' + engineName + '.js');
    return new Engine(pool);
}



