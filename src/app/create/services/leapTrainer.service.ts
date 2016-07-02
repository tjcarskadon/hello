import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { CreatePageState } from '../createPageState.service';
import { AppState } from '../../app.service';

@Injectable()
export class LeapTrainerService {
  trainerCtrl;
  trainer;
  LeapTrainer = require('../../lib/leap-trainer.js');

  constructor(private cpS: CreatePageState, private appState: AppState) {
    
  }


  _initLeapTrainer() {
    this.trainerCtrl = this.appState._initLeapController(); 
    console.log(this.trainerCtrl);
    this.trainerCtrl.connect();
    this.trainer = new this.LeapTrainer.Controller({
      controller: this.trainerCtrl,
      convolutionFactor: 2, 
      trainingGestures: 1
    });
    // this.appState._initRiggedHand();

    // this.trainerCtrl.on('connect', () => console.log('connected'));

    //connect the main controller
    // this.trainerCtrl.use('riggedHand').connect();
  }

  _initLeapTrainerWatch() {
    //remove all previous event listeners from Record Trainer
    this.trainer.removeAllListeners();

    this.trainer.on('gesture-unknown', (allHits, gesture) => {
      //TODO: UI display for message, hits/percentages returned
      console.log('unknown', allHits);
    });

    this.trainer.on('gesture-recognized', (bestHit, closestGestureName, allHits) => {
      console.log('recognized!', closestGestureName);
      
    });
  }  

  _initLeapTrainerRecord() {
    //remove any/all previous event listeners from Watch Trainer
    this.trainer.removeAllListeners();

    this.trainer.on('gesture-created', (gestureName, trianingSkipped) => {
      //TODO: show the div element or component that renders this message on the page
      console.log('we are now recording...');
      
    });

    this.trainer.on('training-countdown', (countdown) => {
      //TODO: display to user countdown
      console.log(countdown);
    });

    this.trainer.on('training-gesture-saved', (gestureName, trainingGestures) => {
      //stop recording
      this.trainer.stop();
      //start recording again
      this.trainer.startTraining(gestureName, this.trainer.trainingCountdown);
    });

    this.trainer.on('training-complete', (gestureName, trainingSet, isPose) => {
      //all training is complete and gesture is now added to the list of saved gestures
      //stop recording first
      this.trainer.stop();
      //add name to listKeys array so gestures can be added to page with most recent on top
      var gestureListKeys = this.cpS.get('gestureListKeys');
      gestureListKeys.unshift(gestureName);
      this.cpS.set('gestureListKeys', gestureListKeys);
      //store the information needed for each gesture in gestureList object
      var gestureList = this.cpS.get('gestureList');
      gestureList[gestureName] = {
        name: gestureName, 
        hit: null,
        playbackHit: null
      };
      this.cpS.set('gestureList', gestureList);
    });
  }  
}


// import { Injectable } from '@angular/core';
// import { HmrState } from 'angular2-hmr';
// import { CreatePageState } from '../createPageState.service';
// import { AppState } from '../../app.service';

// @Injectable()
// export class LeapTrainerService {
//   constructor(private cpS: CreatePageState, private appState: AppState) {

//   }


//   Leap = require('leapjs');
//   // LeapTrainer = require('../../lib/leapTrainer.js');
//   LeapTrainer = require('../../lib/leap-trainer.js');
//   trainerCtrl = new this.Leap.Controller();
//   trainer = new this.LeapTrainer.Controller({
//     controller: this.trainerCtrl,
//     convolutionFactor: 2, 
//     trainingGestures: 1
//   });

//   _initLeapTrainer() {
//     this.appState._initRiggedHand();

//     this.trainerCtrl.on('connect', () => console.log('connected'));

//     //connect the main controller
//     this.trainerCtrl.use('riggedHand').connect();
//   }

//   _initLeapTrainerWatch() {
//     //remove all previous event listeners from Record Trainer
//     this.trainer.removeAllListeners();

//     this.trainer.on('gesture-unknown', (allHits, gesture) => {
//       //TODO: UI display for message, hits/percentages returned
//       console.log('unknown', allHits);
//     });

//     this.trainer.on('gesture-recognized', (bestHit, closestGestureName, allHits) => {
//       console.log('recognized!', closestGestureName);

//     });
//   }  

//   _initLeapTrainerRecord() {
//     //remove any/all previous event listeners from Watch Trainer
//     this.trainer.removeAllListeners();

//     this.trainer.on('gesture-created', (gestureName, trianingSkipped) => {
//       //TODO: show the div element or component that renders this message on the page
//       console.log('we are now recording...');
      
//     });

//     this.trainer.on('training-countdown', (countdown) => {
//       //TODO: display to user countdown
//       console.log(countdown);
//     });

//     this.trainer.on('training-gesture-saved', (gestureName, trainingGestures) => {
//       //stop recording
//       this.trainer.stop();
//       //start recording again
//       this.trainer.startTraining(gestureName, this.trainer.trainingCountdown);
//     });

//     this.trainer.on('training-complete', (gestureName, trainingSet, isPose) => {
//       //all training is complete and gesture is now added to the list of saved gestures
//       //stop recording first
//       this.trainer.stop();
//       //add name to listKeys array so gestures can be added to page with most recent on top
//       var gestureListKeys = this.cpS.get('gestureListKeys');
//       gestureListKeys.unshift(gestureName);
//       this.cpS.set('gestureListKeys', gestureListKeys);
//       //store the information needed for each gesture in gestureList object
//       var gestureList = this.cpS.get('gestureList');
//       gestureList[gestureName] = {
//         name: gestureName, 
//         hit: null,
//         playbackHit: null
//       };
//       this.cpS.set('gestureList', gestureList);
//     });
//   }  
// }
