var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true] , output:{a: 1}},
  {input: [false], output:{a: 0}}
]);

module.exports = net;