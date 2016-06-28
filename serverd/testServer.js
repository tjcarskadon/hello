const express = require('express');
const brain = require('brain');
const rp = require('request-promise');

const app = express();

//this is not a live endpoint....this is old code from how I was parsing data from redis
app.get('/input' (req, res) => {

  let keys = [];
  let data = [];

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
});

app.get('/test', (r, rr) => {

let s = [0,0,0,0,0, -0.434527, -0.526004, -0.731099, 0.801443, -0.586703, 0.116056, 0.856861,
-0.515433,0.0108739,0.603899, -0.62205,-0.498356,0.566052,-0.513158,-0.645177, -8.320999999999998]
  //b


let b = [0,1,1,1,1, -0.0367673, -0.401364, -0.915181, 0.00742554, -0.0444873,
 -0.998982, -0.030553, -0.0449147, -0.998523, -0.129519, -0.0783798,
-0.988474, -0.127741, -0.0563714, -0.990204, -46.35499999999999]


// let s = [0,0,0,0,0, -0.572988, -0.210652, -0.79203,
//         -0.24872, -0.80869, -0.533065, -0.331823, -0.814433, -0.476018, 
//         -0.221569, -0.974411, -0.0378167, -0.390104, -0.918074, -0.070425, -8.320999999999998
//       ]

let a = [0,0,0,0,0, -0.277351, 0.0622898, -0.958747,
  0.173941, -0.829297, 0.531047,
  -0.0759547, -0.821721, 0.564805,
  -0.31771, -0.865285, 0.387741,
  -0.601641, -0.736375, 0.309485, 37.03899999999999];

  let options = {
    method: 'POST',
    uri: 'http://localhost:3000/test',
    body: {
      data: s
    },
    json:true
  }

  rp(options)
  .then( response => {
    // console.log(response)
    rr.end('success');
    }
  )
  .catch(err => {
    // console.log(err)
    rr.end('Error')
  })

  // rr.end('done');
});

app.listen('8000')
console.log('testing on 8000')