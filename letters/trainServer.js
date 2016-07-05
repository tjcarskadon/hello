const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyparser.json());


var brain = require('brain');

app.use(express.static(__dirname));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var results = [];
app.post('/brain', (req, res) => {
      console.log('scanning');
  let input = req.body;

  let extenedFingers = [];
  extenedFingers.push(+input.thumbExtended,+input.indexExtended,+input.middleExtended, +input.ringExtended, +input.pinkyExtended);

  var checkExtendedNet = require('./neurons/checkExtended.js');
  var extendedCheckResults = checkExtendedNet.run([1,1,1,1,1]);
  // if (extendedCheckResults.true > extendedCheckResults.false) {
  if (input.extended) { 
    //is extdended
    console.log('extended');
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
          // check if middle is out
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



  } else {
    //CLOSED POSITION LETTERS DECISION TREE
    //is not extended then send to neuron that will parse 
    //and transfer data to [a, e, m, n, o, s, t, c] paths
    // console.log('CLOSED');
    //Check for rotation
    let rotated_checkNet = require('./neurons/isRotated.js');
    let isRotated = rotated_checkNet.run([input.rotated]);  //input.rotated

    if(isRotated.true > isRotated.false) {
      // console.log('---------ROTATED--------------');
      let OC_checkNet = require('./neurons/thumbMiddle_zTipRangeFinder');
      let isOC = OC_checkNet.run([input.oc]);
      // console.log(input.oc);
      //TODO: look at re adjusting the C to extended - need to improve this performance
      if (isOC.true > isOC.false) {
        // console.log('O');
        results.push('O')
      } else {
        // console.log('C');
        results.push('C');
      }
    } else {
      // console.log('-----------NOT ROTATED-----------');
      let E_checkNet = require('./neurons/isthumbBelow.js');
      let isE = E_checkNet.run([input.e]);
      if(isE.true > isE.false)  {
        // console.log('E');
        results.push('E');
      } else {
        let A_checkNet = require('./neurons/thumbTipIndexKnuck_xRangeFinder');
        let isA = A_checkNet.run([input.a]);
        if(isA.true > isA.false) {
          // console.log('A');
          results.push('A');
        } else {
          let S_checkNet = require('./neurons/thumbMiddle_yRangeFinder.js');
          let isS = S_checkNet.run([input.s]);
          if(isS.true > isS.false) {
            // console.log('S');
            results.push('S');
          } else if (input.t) {
            // console.log('T');
            results.push('T');
          } else if (input.n) {
            // console.log('N');
            results.push('N');
          } else if(input.m) {
            // console.log("m");
            results.push('M');
          }
        }
      }
      
    }
  }
    const numSamples = 30
    var response;
    if(results.length === numSamples) {
      // console.log('check')
      let str = results.join('');
      // console.log(input.target);
      if (input.target) {
        let target = input.target;
        let reg = new RegExp(target,'g');
        let num = (str.match(reg) || []).length;
        if (num / numSamples > 0.5) {
          results = [];
          console.log('true');
          response = true;
        } else {
          results = [];
          console.log('false');
          response = false;
        }
      } else {
        let holder = {};

        // console.log(results)
        results.forEach(result => {
          if (holder.hasOwnProperty(result)) {
            holder[result]++
          } else {
            holder[result] = 1;
          }
        });
        var rep = 0;
        for (key in holder) {
          if (holder[key] > rep) {
            rep = holder[key];
            response = key;
            console.log(response);
            results= [];
          }
        }   
      }
    }
    // console.log(letter);
    // //Good letters, B, L, U, D
    // //Bad Letters V,K,X,F,G,H
    // }

    
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(response);

});


app.listen(3000, () => console.log('listening on 3000'));