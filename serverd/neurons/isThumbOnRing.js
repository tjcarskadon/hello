var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true], output:{n: 1}},
  {input: [false], output:{n: 0}}
]);

module.exports = net;