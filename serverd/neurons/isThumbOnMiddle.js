var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true, true], output:{t: 1}},
  {input: [false, false], output:{t: 0}}
]);

module.exports = net;

