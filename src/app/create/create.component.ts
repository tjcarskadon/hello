import { Component, OnInit } from '@angular/core';
import { LeapTrainerService } from './services/leapTrainer.service';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service'
import { CreatePageState } from './createPageState.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'create',
  template: require('./create.component.html'),
  styles: [require('./create.component.css')],
  providers: [ LeapTrainerService, AppState, CreatePageState ]
})

export class Create implements OnInit {

  state = this.createPageState._state;

  constructor(
    private leapTrainerService: LeapTrainerService,
    private appState: AppState,
    private createPageState: CreatePageState,
    private authService: AuthService,
    private http: Http) {

    this.leapTrainerService._initLeapTrainer();
  }

  ngOnInit() {
   this.authService.authenticate('create');
  }

  ngOnDestroy() {
    // console.log('disconnecting leap controller ')
    this.leapTrainerService.trainerCtrl.disconnect();
  }

  ngAfterViewInit() {
    // var event = new Event('ltContainerAdded');
    document.dispatchEvent(new Event('ltContainerAdded'));
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

  save(gestureName): Observable<Response> {
    var tkn = localStorage.getItem('tkn');
    var url = 'http://52.90.139.255:3333/gestures?access_token='+tkn;
    var gesture = this.leapTrainerService.trainer.gestures[gestureName];
    let body = JSON.stringify({
      data: {name: gestureName, gestureData: gesture},
      grant_type: 'password'
    });

    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //TODO: handle UI for success and error responses
    this.http.post(url, body, options)
    .forEach(r => console.log('response back: ', r))
    .catch(e => console.log('error', e));

    return;
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

}
