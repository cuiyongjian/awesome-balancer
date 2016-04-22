var DynamicWeightedEngine = require('../lib/DynamicWeightedEngine');
var debug = require('debug')('awesomeBalancer:dynamic');

var data = [{
    value: '192.168.1.203',
    weight: 1
},
{
    value: '192.168.1.204',
    weight: 1
},
{
    value: '192.168.1.205',
    weight: 1
},
{
    value: '192.168.1.206',
    weight: 1
},
{
    value: '192.168.1.207',
    weight: 1
},
{
    value: '192.168.1.208',
    weight: 1
},
{
    value: '192.168.1.211',
    weight: 1
}];


var a = new DynamicWeightedEngine(data);

setInterval(function () {
    var rel = a.pick();
    debug('pick成功啦', rel);
}, 4000);
