const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const request = require('request');

const brain = require('brain');
const net = new brain.NeuralNetwork();

const app = express();
app.use(bodyparser.json());

app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));


app.post('/gest', (req, res) => {
  const data = {
    input: req.body,
    output: {swipe: 1}
  };
  net.train(data, {
      errorThresh: 0.005,  // error threshold to reach
      iterations: 20000,   // maximum training iterations
      log: true,           // console.logs progress periodically
      logPeriod: 1,       // number of iterations between logging
      learningRate: 0.3    // learning rate
    });

});

app.post('/test', (req, res) => {
  let result = net.run(req.body);
  console.log(result);
});


app.listen(8000, () => {console.log('listening on 8000');});