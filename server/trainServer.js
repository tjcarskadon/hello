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
  var extendedCheckResults = checkExtendedNet.run([1,1,1,1,1]);
  if (extendedCheckResults.true > extendedCheckResults.false) {
    //is extdended
    //rotated?
    let rotated_checkNet = require('./neurons/isRotated.js');
    let isRotated = rotated_checkNet.run([12.115]);
    if(isRotated.true > isRotated.false) {
      let GH_checkNet = require('./neurons/gh_yRangeFinder.js');
      //takes diff between index tip and mid tip
      //This check is working with dummy data
      let isGH = GH_checkNet.run([6.3415]) ;
      if(isGH.g > isGH.h) {
        console.log('G');
        //G
      } else {
        //H 
       console.log('H');
      }
    } else {
      console.log('______NOT ROTATED______');
      //Check for down fingers
      let TD_checkNet = require('./neurons/isThumbDown.js');
      let isTD = TD_checkNet.run([4.69]);
      if (isTD.true > isTD.false) {
        //thumb is down check for p or q
        console.log('Thumb down');
        let MD_checkNet = require('./neurons/isMiddleDown.js');
        let isMD = MD_checkNet.run([8.151]); 
        if (isMD.true > isMD.false) {
          console.log('P');
          //P
        } else {
          let ID_checkNet = require('./neurons/isIndexDown.js');
          let isID = ID_checkNet.run([85.93]);
          if (isTD.true > isTD.false) {
            //Q
          console.log('Q');
          }
        }

      } else {
        //check if index is out
        let IP_checkNet = require('./neurons/isIndexExtended.js');
        let isIP = IP_checkNet.run([true]);
        if (isIP.true > isIP.false) {
          //check if middle is out
           let MP_checkNet = require('./neurons/isMiddleExtended.js');
           let isMP = MP_checkNet.run([false]);
           if(isMP.true > isMP.false) {
                console.log('middle is extended');
            //middle is out - check if ringfinger is out
            let RP_checkNet = require('./neurons/isRingExtended.js');
            let isRP = RP_checkNet.run([false]);
            if(isRP.true > isRP.false) {
            //ring is out - check if pinky is out
              let PK_checkNet = require('./neurons/isPinkyExtended.js');
              let isPK = PK_checkNet.run([false])
              if(isPK.true > isPK.false) {
              //pinky is out - check thumb
                let TBR_checkNet = require('./neurons/isThumbBelowRing.js');
                let isTBR = TBR_checkNet.run([7.232]);
                if (isTBR.true > isTBR.false) {
                  //B
                  console.log('B');
                }
              } else {
                //W
                console.log('W');
              }
            } else {
              //Check if Index is below M
              let TBM_checkNet = require('./neurons/isIndexBelowMiddle.js');
              let isTBR = TBM_checkNet.run([12.925]);
              if (isTBR.true > isTBR.false) {
                //R
                console.log('R');
              } else {
                //check to see ifthe tips of the index and middle are close together.
                let UVK_checkNet = require('./neurons/indexMiddle_xRangeFinder.js');
                let isUVK = UVK_checkNet.run([6.4908]);
                if (isUVK.true > isUVK.false) {
                  //U
                  console.log('U');
                } else {
                  //check thumb position for V and K
                  let VK_checkNet = require('./neurons/thumbRing_yRangeFinder.js');
                  let isVK = VK_checkNet.run([6.009]);
                  if (isVK.true > isVK.false) {
                    console.log('V');
                    //V
                  } else {
                    //K
                    console.log('K');
                  }
                }
              }
            }
           } else {
            //check to see if the thumb is out
            let TE_checkNet = require('./neurons/isThumbExtended.js');
            let isTE = TE_checkNet.run([false]);
            if (isTE.true > isTE.false) {
              //L
              console.log('L');
            } else {
              //Check for X
              let XD_checkNet = require('./neurons/thumbMiddle_zTipRangeFinder.js');
              let isXD = XD_checkNet.run([-23.054]);
              console.log(isXD.true, isXD.false);
              if (isXD.true > isXD.false) {
                console.log('D');
                //D
              } else {
                //check index tip y against index tip index pip y
                let X_checkNet = require('./neurons/isIndexTipBelowIndexPip.js');
                let isX = X_checkNet.run([25.636]);
                if(isX.true > isX.false) {
                  //X
                  console.log('X');
                }
              }
            }
           }
        } else {
          //check if thumb is below index
          let TI_checkNet= require('./neurons/thumbIndexTip_yRangeFinder.js');
          let isTI = TI_checkNet.run([-6.4016]);
          if (isTI.true > isTI.false) {
            //F
            console.log('F');
          }
        }
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