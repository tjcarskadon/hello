var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check the X distance between the indext tip and the middle tip.  if it is small we have a Us
net.train([
  {input:[24.2303], output:{true: 1}}, 
  {input:[63.4908], output:{false: 0}}
]);

module.exports = net;