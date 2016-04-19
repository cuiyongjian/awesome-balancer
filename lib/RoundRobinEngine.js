var inherits = require('util').inherits;
var AbstractEngine = require('./AbstractEngine');

module.exports = RoundRobinEngine;

function RoundRobinEngine(pool) {
    if (!(this instanceof RoundRobinEngine)) {
        return new RoundRobinEngine(pool);
    }
    AbstractEngine.call(this, pool);
    this._currentIndex = 0;
    this._poolSize = pool.length;
}

inherits(RoundRobinEngine, AbstractEngine);

RoundRobinEngine.prototype.pick = function () {
    var elem = this._pool[this._currentIndex++];
    this._currentIndex = this._currentIndex % this._poolSize;
    return elem;
};
