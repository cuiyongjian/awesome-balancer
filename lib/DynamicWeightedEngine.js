/**
 * file: 轮询周期内自动动态更新节点的权重信息
 * 单个轮询周期结束后，执行一个性能评价回调，该回调返回会对池子内各个节点进行性能评价并
 * 返回一个新的池子，新的池子里包含这些节点并带有最新的weight属性。
 *
 * 这个性能评价器，不仅能用到这个
 */

var inherits = require('util').inherits;
var WeightedRoundRobinEngine = require('./WeightedRoundRobinEngine');
var resourceMeter = require('resource-meter');
var debug = require('debug')('awesomeBalancer:dynamic');

module.exports = DynamicWeightedEngine;

function DynamicWeightedEngine(pool) {
    if (!(this instanceof DynamicWeightedEngine)) {
        return new DynamicWeightedEngine(pool);
    }
    this._runtimePool = pool; // 初始化runtimePool, 此时runtimePool是带weight权重的哦。
    WeightedRoundRobinEngine.call(this, pool); // 处理后this._pool里就不带权重了。

    // 启动定时器，实时更新一个runtimePool. （搞个定时器就为了让下文中的pick能变成同步...）

    var me = this;
    setInterval(function () {
        debug('哥发起了实时计算权重的请求，哥传入的参数为：');
        debug(me._runtimePool);
        var resultPromise = resourceMeter.meter(me._runtimePool);
        resultPromise.then(function (resultNodes) {
            // 剔除weight为0的元素
            resultNodes = resultNodes.filter(function (item) {
                return item.weight != 0;
            });
            me._runtimePool = resultNodes;
            debug('临时中间池子获得一次更新,', me._runtimePool);
        });
    }, 20000);
};

inherits(DynamicWeightedEngine, WeightedRoundRobinEngine);

// 重写轮询的pick， 让他轮询到这个周期末尾的时候，就把当前this._pool换成最新的this._runtimePool
DynamicWeightedEngine.prototype.pick = function () {
    debug('池子长度：', this._poolSize);
    var elem = this._pool[this._currentIndex++];
    this._currentIndex = this._currentIndex % this._poolSize;
    if (this._currentIndex === 0) {
        // 一个周期结束，重置新的池子参数
        debug('一个周期马上结束');
        debug('此时旧池子：', this._pool);
        this._pool = this._runtimePool;
        debug('此时新池子：', this._pool);
        this._pool = this.prepareNewPool(this._pool);
        this._poolSize = this._pool.length;
        if (this._poolSize < 1) {
            throw Error('资源池的节点数目为0，请检查网络通信或节点状况！');
        }
        debug('处理后的新池子：', this._pool);
    }
    return elem;
};


