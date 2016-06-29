var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true], output:{s: 1}},
  {input: [false], output:{s: 0}}
]);

module.exports = net;