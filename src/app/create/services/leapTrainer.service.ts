import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { CreatePageState } from '../createPageState.service';
import { AppState } from '../../app.service';

@Injectable()
export class LeapTrainerService {
  constructor(private createPageState: CreatePageState, private appState: AppState) {

  }


  _initLeapTrainer() {
    var s = this.createPageState._state;
    this.appState._initRiggedHand();

    s.trainerCtrl.on('connect', () => console.log('connected'));
    s.trainer.on('gesture-created', (gestureName, trainingSkipped) => {
       //handle gesture-created UI event
       //TODO: change input of gesture name to a form so user can hit enter instead of clicking create
       s.trainingComplete = false;
       s.gestureName = gestureName;
       console.log(s.gestureNameInput, 'gesture');
       s.gestureNameInput = '';
       s.gestureList[gestureName] = {text: gestureName};
       s.gestureListKeys.unshift(gestureName);
       console.log('gesture created ', gestureName);
     });

     s.trainer.on('training-complete', (gestureName, trainingSet, isPose) => {
       //handle training complete event
       console.log('training complete');
       s.trainingComplete = true;
       
     });

     //training gesture saved will only happen if we need more training gestures --> probably can manually change that
     s.trainer.on('training-gesture-saved', (/*PARAMS*/) => {
       //handle training save event
       console.log('training gesture saved');
     });

     s.trainer.on('gesture-recognized', (hit, gestureName, allHits) => {
       console.log('gesture recognized', gestureName);
       //UI display for the gesture recognized
       //TODO: add transition animations to hide and show the div
       s.recognizedGesture = gestureName;
       //context = s;
       //setTimeout(() => context.recognizedGesture = '', 3000)--> removes the blue div at top

       s.gestureList[gestureName].hit = hit * 100 + '%';

     });


    s.trainerCtrl.on('frame', function(frame) {
      if (frame.pointables.length) {

      }
    });

    //connect ctrl at the end of logic
    s.trainerCtrl.use('riggedHand').connect()
    .on('connect', () => {
      console.log('connected');
    });
  } 
  
}
