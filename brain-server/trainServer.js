var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
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
      if (e.et > 0.75) {
        console.log('E');
      } else {
        console.log('check more')
        //neuron to differentiate A & S/M/N/T
        
      }

    }

  }

  





 
  res.end();

});

app.post('/run', (req, res) => {

  res.end();  
});


app.get('/test', (r, rr) => {

  rr.end();
});

app.listen(3000, () => console.log('listening on 3000'));