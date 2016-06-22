var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip Z and middle tip Z.  If small then D
net.train([
  {input:[20.91126], output:{true: 1}}, 
  {input:[32.8292], output:{false: 0}}
]);

module.exports = net;