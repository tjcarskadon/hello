const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient();


app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));

var brain = require('brain');

app.get('/brain', (req, res) => {

  var checkExtendedNet = require('./neurons/checkExtended.js');
  var extendedCheckResults = checkExtendedNet.run([0,0,0,0,0]);
  if (extendedCheckResults.true > extendedCheckResults.false) {
    //is extended
  } else {
    //is not extended then send to neuron that will parse 
    //and transfer data to [a, e, m, n, o, s, t, c] paths

    var OC_checkNet = require('./neurons/knuckle_yRangeFinder.js');
    var isOC = OC_checkNet.run([-7.2379999999999995]);

    console.log(isOC)
    //TODO: talk to T about this changing this conditional
    // if (isOC) {
      if (isOC.c > isOC.o) {
      //neuron to differentiate O & C
      const OCZ_checkNet = require('./neurons/is_OC.js');
      const OC = OCZ_checkNet.run([-0.154677]);
      if (OC.c > OC.o) {
        console.log('C');
      } else {
        console.log('O');
      }
    } else {
      //neuron to differentiate E & A/S/M/N/T
      const e_checkNet = require('./neurons/isThumbBelow.js');
      
      //check body for thumb tip position vs middleFinger tip position
      //if thumb tip lower on Z axis then middle finger tip then set a flag to true
      //else set to fals and pass this flag into the e_checkNet neuron
      const e = e_checkNet.run([false]);
      if (e.e > 0.75) {
        console.log('E');
      } else {
        console.log('check more')
        //neuron to differentiate A & S/M/N/T

      }

    }

  }

  





 
  res.end();

});

let fetchData = () => {
  let keys = [];
  let data = [];


    client.keysAsync('*')
      .then( response => {
      keys = keys.concat(response);
      return keys;
      })
      .then( keys => {
        Promise.all(keys.map(key => {
            return client.lrangeAsync(key, 0, 1).then( result => result.concat(key));
        }))
        .then(result => {
          let params = [];
          let len1 = result.length;
          // console.log(len1);
          for (let i=0; i < len1; i++) {
            let len2 = result[i].length;
            let letter = result[i][len1 - 1];
            for (let j=0; j < len2 - 1; j++) {
              let hand = JSON.parse(result[i][j]);
              let status = [];
              for (var k in hand) {
                if (hand[k].extended) {
                  status.push(1);
                } else {
                  status.push(0);
                }
              }
              for (var k in hand) {
               status = status.concat(hand[k].direction);
              }
              status.push(hand.thumb.tipPosition[1] - hand.index.dipPosition[1]);
              let obj = {};
              obj.input = status;
              obj.output = {};
              obj.output[letter] = 1;
              params.push(obj);
            }
          }
             // console.log(params, '**objddec***');
             train(params);
        })  
      })
      .catch(e => console.log(e));
}

fetchData();
// let data =[
//            {input:[0,0,0,0,0,-0.00953265, 0.0638593, -0.99791,
//           0.0302952, -0.901895, 0.43089,
//           -0.183438, -0.848622, 0.49617,
//           -0.334163, -0.822958, 0.45942,
//           -0.545984, -0.757856, 0.357151, 11.429999999999978], output: {aa: 1}},

//            {input:[0,1,1,1,1,-0.25735, -0.370085, -0.892641,
//           0.0658166, 0.00730177, -0.997805,
//           0.03123, 0.0226125, -0.999256,
//           -0.0197074, 0.0521914, -0.998443,
//           0.0372486, 0.132279, -0.990512, -46.35499999999999], output: {bb: 1}},

//            {input:[0,0,0,0,0, -0.572988, -0.210652, -0.79203,
//           -0.24872, -0.80869, -0.533065,
//           -0.331823, -0.814433, -0.476018,
//           -0.221569, -0.974411, -0.0378167,
//           -0.390104, -0.918074, -0.070425, -8.320999999999998], output:{ss: 1}},

//            {input: [0,0,0,0,0, -0.240954, -0.0342797, -0.969931,
//           0.0425051, -0.827703, 0.559555,
//           -0.212048, -0.785337, 0.58162,
//           -0.365585, -0.766547, 0.527971,
//           -0.526786, -0.688836, 0.497997, 7.371000000000009], output:{tt:1}}
//           ];

let net = new brain.NeuralNetwork();

let train = (data) => {
  // console.log(data); 
  net.train(data, {
    errorThresh: 0.005,  // error threshold to reach
    iterations: 20000,   // maximum training iterations
    log: true,           // console.log() progress periodically
    logPeriod: 1,       // number of iterations between logging
    learningRate: 0.3    // learning rate
  });
};


app.post('/test', (r, rr) => {

test = (r.body.data);

var output = net.run(test)

console.log(output);
  rr.end();
});

app.listen(3000, () => console.log('listening on 3000'));