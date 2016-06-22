var brain = require('brain');

var net = new brain.NeuralNetwork();

//NOTE IF NEEDED I CAN CHECK TO SEE IF THE THUMB TIP X IS PAST MIDDLE MCP - THIS WOULD BE FOR EXTRA GRANULATRITY
//Check difference between thumb tip y and ring mcp y.  If thumb tip is less than ring MCP
net.train([
  {input:[7.232], output:{true: 1}}, 
  {input:[56.78], output:{false: 0}}
]);

module.exports = net;