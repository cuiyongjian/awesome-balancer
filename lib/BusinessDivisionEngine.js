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
        var realItem = item.value || item.object;
        if (!me._groupPool[type]) {
            me._groupPool[type] = [realItem];
        }
        else {
            me._groupPool[type].push(realItem);
        }
    });
    debug('按业务分组后的池子： ', this._groupPool);

    this._poolEngines = {};
    // 给每个类型的pool创建一个负载均衡引擎
    Object.keys(this._groupPool).forEach(function (type) {
        debug('进来给每个类型的池子创建引擎了');
        var oneTypePool = me._groupPool[type];
        debug('看一种' + type +'类型的池子', oneTypePool);
        me._poolEngines[type] = createEngine(oneTypePool, engineName);
    });
    debug('不同业务的引擎： ', this._poolEngines);
}

inherits(BusinessDivisionEngine, AbstractEngine);

// 根据type对该type的机器进行RoundRobin
BusinessDivisionEngine.prototype.pick = function (type) {
    debug('传入的type为： ' + type);
    if (!type || !this._poolEngines[type]) {
        // 如果没有传入type，或者传入的type并不在现有的里面。就随机选一个业务类型当type。
        var engineTypes = Object.keys(this._poolEngines);
        var len = engineTypes.length;
        var randomIndex = Math.floor((len) * Math.random());
        debug(randomIndex);
        type = engineTypes[randomIndex];
        debug('既然没有传入type(或传的不对)，咱就给你随机搞个type呗，别介意哦： ',type);
    }

    var poolEngine = this._poolEngines[type];
    debug('拿到该type的引擎： ', poolEngine);
    return poolEngine.pick();
}


function createEngine(pool, engineName) {
    debug('看看要单独创建引擎的池子和引擎名： ', pool, engineName);
    if (pool.length < 1) {
        throw Error('pool lenght must greater than zero');
    }
    var Engine = require('./' + engineName + '.js');
    return new Engine(pool);
}



