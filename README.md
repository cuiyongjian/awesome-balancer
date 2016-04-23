# awesome-balancer

<!-- [![npm status](http://img.shields.io/npm/v/loadbalance.svg?style=flat-square)](https://www.npmjs.org/package/loadbalance) -->

awesome-balancer is a load-balance engine included various strategy. It is a collection of load balancing algorithm implementation, which is focus on providing reusable module for other program.

awesome-balancer 是一个包含了多种负载均衡策略的核心引擎，它实现了很多负载均衡的算法，致力于为其他软件程序提供可复用的负载均衡模块。

该负载均衡引擎可支持类似于`反向代理`、`作业调度`的场景。其中的`DynamicWeightedEngine`动态权重引擎依赖于[resource-meter](https://github.com/cuiyongjian/resource-meter)实现了基于集群实时资源状况的动态负载均衡。

## Get Started
With [node](https://nodejs.org) and [npm](https://npmjs.org) in your system, and in your project to execute:
```bash
npm install awesome-balancer --save
```
add to your program
```js
var lb = require('awesome-balancer')
```

## Usage
To use, instantiate an engine or call a factory method with a pool. Then call pick(), which will return the selected object, calling pick() repeatedly will yield the same or a different object from the pool, depending on the algorithm which powers that engine.

```javascript
var engine = lb.random(['a', 'b', 'c'])
var pick = engine.pick()
```

### pick()
Pick is called without any arguments and will always return an object which is a member of the pool.

## Engines

### Random Engine
The random engine picks an object from the pool at random, each time pick() is called.

```javascript
var lb = require('loadbalance')
var engine = lb.random(['a', 'b', 'c'])
var pick = engine.pick()
```

You can also use as a class: new RandomEngine(pool, seed)
```javascript
var engine = new lb.RandomEngine(pool)
```
Pool - an objects to pick from, eg ```[1,2,3]```
Seed - an optional seed that will be used to recreate a random sequence of selections

### RoundRobinEngine
An engine that picks objects from its pool using Round Robin algorithm (doh!)

```javascript
var engine = lb.roundRobin(['a', 'b', 'c'])
var pick = engine.pick()
```

The roundRobin() factory method can be used to obtain both RoundRobinEngine and WeightedRoundRobinEngine. The decision is based on the contents of the pool.

You can also use as a class: new RoundRobinEngine(pool)
```javascript
var engine = new lb.RoundRobinEngine(pool)
```
Pool - objects to pick from, eg ```[1,2,3]```

### WeightedRoundRobinEngine
Same as round robin engine, only members of the pool can have weights.

```javascript
var engine = lb.roundRobin([{ object: 'a', weight: 2 }, {object: 'b', weight: 1 }])
var pick = engine.pick()
```

call pick six times using the above engine will yield: 'a', 'a', 'b', 'a', 'a', 'b'

You can also use as a class: new WeightedRoundRobinEngine(pool)
```javascript
var engine = new lb.WeightedRoundRobinEngine(pool)
```
Pool - objects to pick from. Each object is of the form:
```javascript
var object1 = {
    object: 'something',
    weight: 2
}
或
var object1 = {
    value: 'something',
    weight: 2
}
```

Weight should always be an integer which is greater than zero.
Object (you can also use value, its an alias property) can be anything you want, just like other pools. It cannot, however, be null or undefined at the time the pool is created.


### DynamicWeightedEngine
Familiar with the WeightedRoundRobinEngine, but its weight of pool will be change dynamic each cycle.

This algorithm use [resource-meter](https://github.com/cuiyongjian/resource-meter) project to make the resource weight dynamic. So, first you should start the `resource-meter probe` on your clusters' nodes.\(See [probe mode](https://github.com/cuiyongjian/resource-meter#探针模式) to konw how start the `resource-meter probe` \)
And then, on the master node, you can use DynamicWeightedEngine like this:

```javascript
var pool = [{value: 'xxx', weight: 1}, {value: 'xxx', weight: 1}];
var engine = lb.dynamicWeighted(pool)
var pick = engine.pick()
```
You can also use as a class: new RoundRobinEngine(pool)
```javascript
var engine = new lb.BusinessDivision(pool)
```

As you see above, you should pass the nodes with a initial property 'weight' \(for example weight:1\), but , some time later, the weight will be change dynamically by the nodes' runtime resource. [get info by resource-meter probe]. Even so, you still should pass the weight property at first time.

### BusinessDivisionEngine
An engine that divide the pool members by its type, and in each type picking the object using a specify engine.

```javascript
var engine = lb.businessDivision([{type: 'one', value: 'a'}, {type: 'two', value: 'b'}], 'RandomEngine')
var pick = engine.pick()
```
You can also use as a class: new RoundRobinEngine(pool)
```javascript
var engine = new lb.BusinessDivision(pool)
```

The BusinessDivisionEngine should pass the second parameter--'engineName'. For example, if you want to use 'RandomEngine' in each business type, you should create the engine like this:
```
var engine = new lb.BusinessDivision(pool, 'RandomEngine')
```

When you use pick(), you should pass the 'type' paramerters like this:
```
engine.pick('type')
```
The 'type' should as same as the 'type' you set the pool.

### PriorityEngine
Not yet implemented



### Extensibility
Here is an example of a custom engine:
```javascript
var AbstractEngine = require('awesome-balancer').AbstractEngine
var inherits = require('util').inherits

function MyEngine(pool) {
    AbstractEngine.call(this, pool)
}

inherits(MyEngine, AbstractEngine)

MyEngine.prototype.pick = function () {
    // pick something from the pool somehow and return it
}

```
The contract of pick() states that it MUST return something each invocation.

## test
   `npm test`

Please specify the `DEBUG` environment variable to be "awesomeBalancer:*", to display the debug messages.

## misc

This module is created on the basis of [node-balance](https://github.com/kessler/node-loadbalance). awesome-balancer extends from it and enhance it.

This module is heavily inspired by this [article about load balance algorithms](https://devcentral.f5.com/articles/intro-to-load-balancing-for-developers-ndash-the-algorithms)

## license
This software is free to use under the [MIT](http://opensource.org/licenses/MIT)  license. See the [LICENSE file][] for license text and copyright information.
[LICENSE file]: https://github.com/cuiyongjian/awesome-balancer/blob/master/LICENSE

Copyright © 2016 [cuiyongjian](http://blog.cuiyongjian.com) <cuiyongjian@outlook.com>
