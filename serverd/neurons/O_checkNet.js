var brain = require('brain');

var net = new brain.NeuralNetwork();

//get range of fingers tip 
net.train([
  {input:[3.4350999999999985], output:{o: 1}}, 
  {input:[43.869299999999996], output:{o: 0}}
]);

module.exports = net;