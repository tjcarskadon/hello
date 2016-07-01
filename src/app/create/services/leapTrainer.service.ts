import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { CreatePageState } from '../createPageState.service';
import { AppState } from '../../app.service';

@Injectable()
export class LeapTrainerService {
  constructor(private cpS: CreatePageState, private appState: AppState) {

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
    this.appState._initRiggedHand();

    this.trainerCtrl.on('connect', () => console.log('connected'));
    
    this.trainer.on('gesture-created', (gestureName, trianingSkipped) => {
      //show the div element or component that renders this message on the page
      console.log('we are now recording...');
      
    });

    this.trainer.on()

  }  
}
