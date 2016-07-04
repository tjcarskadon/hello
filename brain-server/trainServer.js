const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
// const redis = require('redis');
const bluebird = require('bluebird');
// bluebird.promisifyAll(redis.RedisClient.prototype);
// const client = redis.createClient()
app.use(bodyparser.json());

console.log(path.resolve(__dirname,'../client'))

var brain = require('brain');

app.use(express.static(path.resolve(__dirname,'../client')));


let results = [];
app.post('/brain', (req, res) => {
      // console.log('scanning');
  let input = req.body;
  var checkExtendedNet = require('./neurons/checkExtended.js');
  var extendedCheckResults = checkExtendedNet.run([1,1,1,1,1]);
  if (extendedCheckResults.true > extendedCheckResults.false) {
    //is extdended
    //rotated?
    let rotated_checkNet = require('./neurons/isRotated.js');
    let isRotated = rotated_checkNet.run([input.rotated]);  //input.rotated
    if(isRotated.true > isRotated.false) {
      // console.log('---------ROTATED--------------');
      let GH_checkNet = require('./neurons/gh_yRangeFinder.js');  
      //takes diff between index tip and mid tip
      //This check is working with dummy data
      // console.log(input.gh);
      let isGH = GH_checkNet.run([input.gh]) ;  //input.gh
      if(isGH.g > isGH.h) {
        // console.log('G');
        results.push('G');
        //G
      } else {
        //H 
       // console.log('H');
       results.push('H');
      }
    } else {
      // console.log('______NOT ROTATED______');
      //Check for down fingers
      let TD_checkNet = require('./neurons/isThumbDown.js');
      let isTD = TD_checkNet.run([input.td]); //input.td
      if (isTD.true > isTD.false) {
        //thumb is down check for p or q
        // console.log('thumb down')
        // console.log(input.md)
        let MD_checkNet = require('./neurons/isMiddleDown.js');
        let isMD = MD_checkNet.run([input.md]); 
        if (isMD.true > isMD.false) {
          // console.log('P');
          results.push('P');
          //P
        } else {
          let ID_checkNet = require('./neurons/isIndexDown.js');
          let isID = ID_checkNet.run([input.id]);
          if (isTD.true > isTD.false) {
            //Q
            results.push('Q');
          // console.log('Q');
          }
        }

      } else {
        //check if index is out
        let IP_checkNet = require('./neurons/isIndexExtended.js');
        let isIP = IP_checkNet.run([input.indexExtended]);
        if (isIP.true > isIP.false) {
          //check if middle is out
          // console.log('index extended');
           let MP_checkNet = require('./neurons/isMiddleExtended.js');
           let isMP = MP_checkNet.run([input.middleExtended]);
           if(isMP.true > isMP.false) {
                // console.log('middle is extended');
            //middle is out - check if ringfinger is out
            let RP_checkNet = require('./neurons/isRingExtended.js');
            let isRP = RP_checkNet.run([input.ringExtended]);
            if(isRP.true > isRP.false) {
            //ring is out - check if pinky is out
              // console.log('ring extended');
              let PK_checkNet = require('./neurons/isPinkyExtended.js');
              let isPK = PK_checkNet.run([input.pinkyExtended])
              if(isPK.true > isPK.false) {
              //pinky is out - check thumb
                let TBR_checkNet = require('./neurons/isThumbBelowRing.js');
                let isTBR = TBR_checkNet.run([input.tbr]);
                if (isTBR.true > isTBR.false) {
                  //B
                  // console.log('thumb extended');
                  // console.log('B');
                  results.push('B');
                }
              } else {
                //W
                // console.log('W');
                results.push('W');
              }
            } else {
              //Check if Index is below M
              let IBM_checkNet = require('./neurons/isIndexBelowMiddle.js');
              let isIBM = IBM_checkNet.run([input.ibm]);
              if (isIBM.true > isIBM.false) {
                //R
                // console.log('R');
                results.push('R');
              } else {
                //check to see ifthe tips of the index and middle are close together.
                let UVK_checkNet = require('./neurons/indexMiddle_xRangeFinder.js');
                let isUVK = UVK_checkNet.run([input.uvk]);
                // console.log(input.uvk);
                if (isUVK.true > isUVK.false) {
                  //U
                  // console.log('U');
                  results.push('U');
                } else {
                  //check thumb position for V and K
                  let VK_checkNet = require('./neurons/thumbRing_yRangeFinder.js');
                  let isVK = VK_checkNet.run([input.vk]);
                  if (isVK.true > isVK.false) {
                    //V
                    // console.log('V');
                    results.push('V');
                  } else {
                    //K
                    // console.log('K');
                    results.push('K');
                  }
                }
              }
            }
           } else {
            //check to see if the thumb is out
            let TE_checkNet = require('./neurons/isThumbExtended.js');
            let isTE = TE_checkNet.run([input.thumbExtended]);
            if (isTE.true > isTE.false) {
              //L
              // console.log('L');
              results.push('L');
            } else {
              //Check for X
              let XD_checkNet = require('./neurons/thumbMiddle_zTipRangeFinder.js');
              let isXD = XD_checkNet.run([input.xd]);
              // console.log(isXD.true, isXD.false);
              if (isXD.true > isXD.false) {
                // console.log('D');
                results.push('D');
                //D
              } else {
                //check index tip y against index tip index pip y
                let X_checkNet = require('./neurons/isIndexTipBelowIndexPip.js');
                let isX = X_checkNet.run([input.x]);
                if(isX.true > isX.false) {
                  //X  this is super hard
                  // console.log('X');
                  results.push('X')
                }
              }
            }
           }
        } else {
          //check if thumb is below index
          let TI_checkNet= require('./neurons/thumbIndexTip_yRangeFinder.js');
          let isTI = TI_checkNet.run([input.f]);
          if (isTI.true > isTI.false) {
            //F
            // console.log('F');
            results.push('F');
          }
        }
      }
    }


    if(results.length === 60) {
      // console.log('check')
      let str = results.join('');
      // console.log(str);
      let num = (str.match(/D/g) || []).length;

      if (num / 60 > 0.5) {
        console.log('TRUE');
        results = [];
      } else {
        results = [];
        console.log('FALSE');
      }

    //Good letters, B, L, U, D
    //Bad Letters V,K,X,F,G,H
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

//check input and if it matches conditions return something to the console.  
//this didn't work
app.post('/btest', (req, res) => {
  console.log('scanning....')
  input = req.body;
  console.log(input)
//check if all four fingers are extended and the thumb is below the ring finger 
  let IP_checkNet = require('./neurons/isIndexExtended.js');
  let isIP = IP_checkNet.run([input.indexExtended]);
  let MP_checkNet = require('./neurons/isMiddleExtended.js');
  let isMP = MP_checkNet.run([input.middleExtended]);
  let RP_checkNet = require('./neurons/isRingExtended.js');
  let isRP = RP_checkNet.run([input.ringExtended]);
  let PK_checkNet = require('./neurons/isPinkyExtended.js');
  let isPK = PK_checkNet.run([input.pinkyExtended])

  let extended = isIP > 0.5 && isMP > 0.5 && isRP > 0.5 && isPK > 0.5 ? true : false;

  let TBR_checkNet = require('./neurons/isThumbBelowRing.js');
  let isTBR = TBR_checkNet.run([input.tbr]);
  if (isTBR.true > isTBR.false) {
    //B
    // console.log('thumb extended');
    console.log('B');
    res.send('made a b');
}

});

app.post('/test', (r, rr) => {

test = (r.body.data);

var output = net.run(test)

console.log(output);
  rr.end();
});

app.listen(3000, () => console.log('listening on 3000'));