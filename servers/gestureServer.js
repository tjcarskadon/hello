const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const request = require('request');
const fs = require('fs');
const brain = require('brain');
const net = new brain.NeuralNetwork();

const app = express();
app.use(bodyparser.json());

app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));

app.get('/sub', (req, res) => {
  fs.readFile('./leapPlayback.json', (err, data) => {
    if (!err) {
      let content = JSON.parse(data);
      let coords = content.frames[1].toString()
        .replace(/[\[\]]+/g,'')
        .replace(/[right]+/g,1)
        .replace(/[left]+/g,0)
        .replace(/[true]+/g,1)
        .replace(/[false]+g/,0);

      let coordsArray = coords.split(',');
      coordsArray = coordsArray.map(value => {
          return parseFloat(value)
      });
      let d = {
        input: coordsArray,
        output: {gest: 1}
      }
      console.log(typeof coordsArray[1]);
      console.log(net.run(d));
      res.end();
    }
  });

});

app.get('/parse', (req, res) => {

  fs.readFile('./leapPlayback.json', (err, data) => {
    if (!err) {
      let content = JSON.parse(data);
      let coords = content.frames[1].toString()
        .replace(/[\[\]]+/g,'')
        .replace(/[right]+/g,1)
        .replace(/[left]+/g,0)
        .replace(/[true]+/g,1)
        .replace(/[false]+g/,0);
      let cordsArray = coords.split(',');
      cordsArray = cordsArray.map(value => {
          return parseFloat(value)
      });
      let d = {
        input: cordsArray,
        output: {gest: 1}
      }
      console.log(cordsArray);
      net.train(d,{log: true, logPeriod: 1});
      res.end();
    }
  });

});

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
  // let result = net.run(req.body);
  // console.log(result);
  sub(req.body);
});


app.listen(8000, () => {console.log('listening on 8000');});