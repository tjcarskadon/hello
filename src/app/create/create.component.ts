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

  constructor(private leapTrainerService: LeapTrainerService, private appState: AppState, private createPageState: CreatePageState) {
    this.leapTrainerService._initLeapTrainer();


  }

  setActiveGesture(gestureName) {
    return this.state.gestureName === gestureName ? 'primary' : null;
  }

  recordGesture(gestureName) {
    //TODO: handle no user input for gesture name
    this.leapTrainerService.trainer.create(gestureName.toUpperCase());
  }

  testGesture(gestureName) {
    console.log('test')
  }

  saveGesture(gestureName) {
    console.log('save')
  }

  playback(gestureName) {
    // this.state.gestureName = gestureName;
    this.createPageState.set('gestureName', gestureName);
    this.createPageState.set('trainingComplete', true);
    this.state.trainingComplete = true;
    //playback logic for gesture...playback plugin? 
  }

  ngOnInit() {


  }

}
