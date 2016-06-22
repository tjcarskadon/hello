var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between middle tip Y and index knuckle Y -  large means middle facing down
net.train([
  {input:[74.268], output:{true: 1}}, 
  {input:[8.151], output:{false: 0}}
]);

module.exports = net;