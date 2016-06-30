import { Component, OnInit } from '@angular/core';
import { RecordService } from './services/record.service';
import { AppState } from '../app.service';

@Component({
  selector: 'create',
  template: require('./create.component.html'), 
  styles: [require('./create.component.css')], 
  providers: [RecordService, AppState]
})
export class Create implements OnInit {

  trainerCtrl;
  trainer;
  Leap;
  LeapTrainer;
  gestureNameInput: string;
  gestureName: string;
  gestureList = {};
  gestureListKeys = [];
  recognizedGesture: string;
  trainingComplete = false;

  constructor(private recordService: RecordService, private appState: AppState) {
    this.Leap = require('leapjs');
    this.appState._initRiggedHand();
    this.LeapTrainer = require('lt/leaptrainer.js');
    //----------//

    this.trainerCtrl = new this.Leap.Controller();
    this.trainer = new this.LeapTrainer.Controller({
      controller: this.trainerCtrl, 
      convolutionFractor: 2
    });

    console.log(this.trainerCtrl);
    this.trainerCtrl.on('connect', () => console.log('connected'));

     this.trainer.on('gesture-created', (gestureName, trainingSkipped) => {
       //handle gesture-created UI event
       //TODO: change input of gesture name to a form so user can hit enter instead of clicking create
       this.trainingComplete = false;
       this.gestureName = gestureName;
       console.log(this.gestureNameInput, 'gesture');
       this.gestureNameInput = '';
       this.gestureList[gestureName] = {text: gestureName};
       this.gestureListKeys.unshift(gestureName);
       console.log('gesture created ', gestureName);
     });

     this.trainer.on('training-complete', (gestureName, trainingSet, isPose) => {
       //handle training complete event
       console.log('training complete');
       this.trainingComplete = true;
       
     });

     //training gesture saved will only happen if we need more training gestures --> probably can manually change that
     this.trainer.on('training-gesture-saved', (/*PARAMS*/) => {
       //handle training save event
       console.log('training gesture saved');
     });

     this.trainer.on('gesture-recognized', (hit, gestureName, allHits) => {
       console.log('gesture recognized', gestureName);
       //UI display for the gesture recognized
       //TODO: add transition animations to hide and show the div
       this.recognizedGesture = gestureName;
       //context = this;
       //setTimeout(() => context.recognizedGesture = '', 3000)--> removes the blue div at top

       this.gestureList[gestureName].hit = hit * 100 + '%';

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

  setActiveGesture(gestureName) {
    return this.gestureName === gestureName ? 'primary' : null;
  }

  recordGesture(gestureName) {
    //TODO: handle no user input for gesture name
    this.trainer.create(gestureName.toUpperCase());
  }

  testGesture(gestureName) {
    console.log('test')
  }

  saveGesture(gestureName) {
    console.log('save')
  }

  playback(gestureName) {
    this.gestureName = gestureName;
    this.trainingComplete = true;
    //playback logic for gesture...playback plugin? 
  }

  ngOnInit() {


  }

}
