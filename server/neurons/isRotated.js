var brain = require('brain');

var net = new brain.NeuralNetwork();

//CHeck roatation of hand 
net.train([
  {input:[-47.666], output:{true: 1}}, 
  {input:[12.115], output:{false: 1}}
]);

module.exports = net;