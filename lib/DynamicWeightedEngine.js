/**
 * file: 轮询周期内自动动态更新节点的权重信息
 * 单个轮询周期结束后，执行一个性能评价回调，该回调返回会对池子内各个节点进行性能评价并
 * 返回一个新的池子，新的池子里包含这些节点并带有最新的weight属性。
 *
 * 这个性能评价器，不仅能用到这个
 */

var inherits = require('util').inherits;
var AbstractEngine = require('./AbstractEngine');


function DynamicWeightedEngine
