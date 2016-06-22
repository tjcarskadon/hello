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
    //is extdended
    //rotated?
    let rotated_checkNet = require('./neurons/isRotated.js');
    let isRotated = rotated_checkNet.run(/*DATA*/);
    if(isRotated.true > isRotated.false) {
      let GH_checkNet = require('./neurons/gh_yRangeFinder.js');
      //takes diff between index tip and mid tip
      let isGH = GH_checkNet.run(/*DATA*/);
      if(isGH.g > isGH.h) {
        //G
      } else {
        //H
      }
    } else {
      //Check for down fingers
      let TD_checkNet = require('./neurons/isThumbDown.js');
      let isTD = TD_checkNet.run(/*DATA*/);
      if (isThumbDown.true > isThumbDown.false) {
        //thumb is down check for p or q
        let MD_checkNet = require('./neurons/isMiddleDown.js');
        let isMD = MD_checkNet.run(/*DATA*/);
        if (isMD.true > isMD.false) {
          //P
        } else {
          let ID_checkNet = require('./neurons/isIndexDown.js');
          let isID = ID_checkNet.run(/*DATA*/);
          if (isTD.true > isTD.false) {
            //Q
          }
        }

      } else {
        //check if index is out
      }
    }

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

app.post('/test', (r, rr) => {

test = (r.body.data);

var output = net.run(test)

console.log(output);
  rr.end();
});

app.listen(3000, () => console.log('listening on 3000'));