var d = require('../lib/DynamicWeightedEngine');
console.log('debug');

var dd = [{
    value: 'old.cuiyongjian.com',
    weight: 1
},
{
    value: 'linux.cuiyongjian.com',
    weight: 2
}];

var a = new d(dd);

setInterval(function () {
    var rel = a.pick();
    debug('pick成功啦', rel);
}, 4000);
