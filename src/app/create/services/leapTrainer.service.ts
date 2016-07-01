import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { CreatePageState } from '../createPageState.service';
import { AppState } from '../../app.service';

@Injectable()
export class LeapTrainerService {
  constructor(private createPageState: CreatePageState, private appState: AppState) {

  }


  Leap = require('leapjs');
  // LeapTrainer = require('../../lib/leapTrainer.js');
  LeapTrainer = require('../../lib/leap-trainer.js');
  trainerCtrl = new this.Leap.Controller();
  trainer = new this.LeapTrainer.Controller({
    controller: this.trainerCtrl,
    convolutionFactor: 2, 
    trainingGestures: 3
  });

  _initLeapTrainer() {
    // var s = this.createPageState._state;
    var s = this.createPageState;
    this.appState._initRiggedHand();

    this.trainerCtrl.on('connect', () => console.log('connected'));
    this.trainer.on('gesture-created', (gestureName, trainingSkipped) => {

       //TODO: change input of gesture name to a form so user can hit enter instead of clicking create
       s.set("trainingComplete", false);
       s.set("gestureName", gestureName);
       console.log(s._state.gestureNameInput, 'gesture');
       s.set("gestureNameInput", '');
       var gestureList = s.get('gestureList');
       gestureList[gestureName] = {text: gestureName};
       s.set('gestureList', gestureList);
       
       console.log('gesture created ', gestureName);
     });

     this.trainer.on('training-complete', (gestureName, trainingSet, isPose) => {
       //handle training complete event
       var gestureListKeys = s.get('gestureListKeys');
       gestureListKeys.unshift(gestureName);
       s.set('gestureListKeys', gestureListKeys);
       s.set('gestureName', null);
       this.trainer.stop();
       console.log('training complete');
       s.set("trainingComplete", true);
       console.log(trainingSet);
       
     });

     this.trainer.on('training-countdown', (countdown) => {
       console.log(countdown);
     });

     this.trainer.on('training-started', () => {
       console.log('training has started');
     })

     //training gesture saved will only happen if we need more training gestures --> probably can manually change that
     this.trainer.on('training-gesture-saved', (name, trainingGestures) => {
       //handle training save event
       //stop recording
       this.trainer.stop();
       //start countdown, and recording
       this.trainer.startTraining(name, this.trainer.trainingCountdown);
       console.log('training gesture saved');

     });

     this.trainer.on('gesture-detected', (gesture, frameCount) => {
       // console.log(frameCount, gesture);
     });
     this.trainer.on('gesture-unknown', (allHits, gesture) => {
       console.log('allhits, ', allHits, gesture);
     })

     this.trainer.on('gesture-recognized', (hit, gestureName, allHits) => {
       console.log('gesture recognized', gestureName);
       //UI display for the gesture recognized
       //TODO: add transition animations to hide and show the div
       s.set("recognizedGesture", gestureName);
       //context = s;
       //setTimeout(() => context.recognizedGesture = '', 3000)--> removes the blue div at top

       var gestureList = s.get('gestureList');
       gestureList[gestureName].hit = hit * 100 + '%';

       s.set('gestureList', gestureList);

     });


    this.trainerCtrl.on('frame', function(frame) {
      if (frame.pointables.length) {

      }
    });

    //connect ctrl at the end of logic
    this.trainerCtrl.use('riggedHand').connect()
    .on('connect', () => {
      console.log('connected');
    });
  } 
  
}
