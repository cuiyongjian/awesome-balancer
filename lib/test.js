var d = require('./DynamicWeightedEngine');

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
    console.log('pick成功啦');
    console.log(rel);
}, 4000);
