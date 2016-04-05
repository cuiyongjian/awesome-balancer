
var AbstractEngine = function (pool) {
    // 若被人直接调用该函数（非new），则强制转成new AbstractEngine的调用。
    if (!(this instanceof AbstractEngine)) {
        return new AbstractEngine(pool);
    }
    this._pool = pool;
};

/**
 * pick the member from the pool using current load-balance algorithm
 */
AbstractEngine.prototype.pick = function () {
    throw new Error('dont use abstract engine');
};

module.exports = AbstractEngine;
