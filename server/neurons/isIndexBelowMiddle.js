var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between index tip y and middle tip y.  If differnce is greater we have an R
net.train([
  {input:[12.469], output:{true: 1}}, 
  {input:[2.925], output:{false: 0}}
]);

module.exports = net;