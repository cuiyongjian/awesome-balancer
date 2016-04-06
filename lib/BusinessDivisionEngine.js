var inherits = require('util').inherits;
var AbstractEngine = require();

function BusinessDivisionEngine(poll) {
    // 要求pool里面有对应的业务类型type. 如果pool元素中有weight属性则使用加权轮询，没有则用基本轮询。
    if (!(this instanceof BusinessDivisionEngine)) {
        return new BusinessDivisionEngine(pool);
    }
    var groupPool = {};
    this._poolEngines = {}; // 存放每个业务类型的轮询引擎
    pool.forEach(function (item) {
        if (!groupPool[item.type]) {
            groupPool[item.type] = item;
        }
        else {
            groupPool[item.type].push(item);
        }
    });
    AbstractEngine.call(this, groupPool);
    var me = this;
    // 给每个类型的pool创建一个负载均衡引擎
    Object.keys(this._groupPool).forEach(function (type) {
        var oneTypePool = me._groupPool[type];
        me._poolEngines[type] = createRoundRobin(oneTypePool);
    });
}

// 根据type对该type的机器进行RoundRobin
BusinessDivisionEngine.prototype.pick = function (type) {
    var pool = this._poolEngines[type];

}


function createRoundRobin(pool) {
    if (pool.length < 1) {
        throw Error('pool lenght must greater than zero');
    }
    if (pool[0].weight) {
        return new (require('./WeightedRoundRobinEngine')();
    }
    else {
        return new (require('./RoundRobinEngine'))();
    }
}
