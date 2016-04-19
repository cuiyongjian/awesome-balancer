var inherits = require('util').inherits;
var AbstractEngine = require('./AbstractEngine');
var Random = require('random-js');
var debug = require('debug')('RandomEngine');

module.exports = RandomEngine;

function RandomEngine(pool, seed) {
    // 既可以做构造器，又可以做静态工厂函数
    if (!(this instanceof RandomEngine)) {
        return new RandomEngine(pool, seed);
    }
    AbstractEngine.call(this, pool);
    this._memberMax = pool.length - 1;
    if (typeof seed === 'number') {
        debug('using Mersenne Twister engine with seed %d', seed);
        this._r = new Random(Random.engines.mt19937().seed(seed));
    }
    else {
        debug('using native Math Engine');
        this._r = new Random(Random.engines.nativeMath);
    }
}

inherits(RandomEngine, AbstractEngine);

RandomEngine.prototype.pick = function () {
    var randomIndex = this._r.integer(0, this._memberMax);
    return this._pool[randomIndex];
};
