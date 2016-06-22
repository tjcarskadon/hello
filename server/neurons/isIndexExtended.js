var brain = require('brain');

var net = new brain.NeuralNetwork();
//Check to see if index is extended
net.train([
  {input: [true], output: {true: 1}}, 
  {input: [false], output: {false: 0}}
]);

module.exports = net;