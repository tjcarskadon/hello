var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true], output: {et: 1}}, 
  {input: [false], output: {ef: 0}}
]);

module.exports = net;