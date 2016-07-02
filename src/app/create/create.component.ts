import { Component, OnInit } from '@angular/core';
import { LeapTrainerService } from './services/leapTrainer.service';
import { AppState } from '../app.service';
import { CreatePageState } from './createPageState.service';

@Component({
  selector: 'create',
  template: require('./create.component.html'),
  styles: [require('./create.component.css')],
  providers: [LeapTrainerService, AppState, CreatePageState]
})

export class Create implements OnInit {

  state = this.createPageState._state;

  constructor(
    private leapTrainerService: LeapTrainerService,
    private appState: AppState,
    private createPageState: CreatePageState) {
    this.leapTrainerService._initLeapTrainer();
  }

  setActiveGesture(gestureName) {
    return this.state.selectedGesture === gestureName ? 'primary' : null;
  }

  recordGesture(gestureName) {
    //stop listening for gesture matching
    this.leapTrainerService.trainer.listening = false;
    //initialize Recording trainer
    this.leapTrainerService._initLeapTrainerRecord();
    if (gestureName) {
      console.log(gestureName);
      this.leapTrainerService.trainer.create(gestureName.toUpperCase());
    }
    //TODO: implement UI/X message for no input
  }

  stopRecording(gestureName) {
    this.leapTrainerService.trainer.stop();
  }

  testGesture(gestureName) {
    //initialize Testing trainer
    this.leapTrainerService._initLeapTrainerRecord();
    console.log('test')
  }

  saveGesture(gestureName) {
    this.createPageState.set('gestureName', null);
    console.log('Attempting to save value...');
    setTimeout(function() {
      console.log('...value not saved.')
    }, 2000);
  }

  playback(gestureName) {
    this.createPageState.set('selectedGesture', gestureName);
    //TODO: add more options
    //display options for : ['Test', ...options]
    this.createPageState.set('displayGestureOptions', true);

  }

  test(gestureName) {
    //signal to Trainer that we are now listening to test a gesture
    this.leapTrainerService._initLeapTrainerWatch();
    this.leapTrainerService.trainer.listening = true;
  }

  update(gestureName) {
    var gesture = this.createPageState.get('gestureData');
    // //only one gesture is being saved so change property to reflect this 
    //-- allows the 'training complete' event to fire when expected (default is after 3 samples saved)
    console.log("Ok, one sec! Let me see if I can understand this one better");
    this.leapTrainerService.trainer.trainingGestures = 1;
    this.leapTrainerService.trainer.updateTrainingData(gestureName, gesture);
    // //TODO: handle UI message for currently made gesture to be updated to saved DB -- improves ML
  }

  reset() {
    console.log('Attempting to reset value...');
    setTimeout(function() {
      console.log('...value not reset.')
    }, 2000);
  }

  ngOnInit() {


  }

}
