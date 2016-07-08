import { Component, OnInit } from '@angular/core';
import { AlphabetCaptureCheck } from './AlphabetCaptureCheck.service';
import { AuthService } from '../auth.service';
import { AppState } from '../app.service';
<<<<<<< b0684dd1828574d9da6f74fd0550d870871d169f
import { LetterCheckingService } from '../LetterCheckingService.service';
=======
import { LetterCheckingService } from '../LetterCheckingService.service'
>>>>>>> (feat) - gesture recognition complete for learn page

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
  providers: [ AlphabetCaptureCheck, AppState, LetterCheckingService ]
})

export class Learn implements OnInit {
  private localState = {gestures: {}};
  private ltrCtrlConnected: boolean = false;
  private riggedHand: boolean = false;
  private imageUrl: string = '';
  private clickedLtr: string;
  private _ = require('underscore');
  private startTimer: boolean = false;
  private sec: number = 5;
  private interval;
  private color: string = 'warn';
  private mastered = [];
  private gestureNames: string[] = [];

  private letters = [
    {val: 'A', color:'primary', count: 0},
    {val: 'B', color:'primary', count: 0},
    {val: 'C', color:'primary', count: 0},
    {val: 'D', color:'primary', count: 0},
    {val: 'E', color:'primary', count: 0},
    {val: 'F', color:'primary', count: 0},
    {val: 'G', color:'primary', count: 0},
    {val: 'H', color:'primary', count: 0},
    {val: 'I', color:'primary', count: 0},
    {val: 'J', color:'primary', count: 0},
    {val: 'K', color:'primary', count: 0},
    {val: 'L', color:'primary', count: 0},
    {val: 'M', color:'primary', count: 0},
    {val: 'N', color:'primary', count: 0},
    {val: 'O', color:'primary', count: 0},
    {val: 'P', color:'primary', count: 0},
    {val: 'Q', color:'primary', count: 0},
    {val: 'R', color:'primary', count: 0},
    {val: 'S', color:'primary', count: 0},
    {val: 'T', color:'primary', count: 0},
    {val: 'U', color:'primary', count: 0},
    {val: 'V', color:'primary', count: 0},
    {val: 'W', color:'primary', count: 0},
    {val: 'X', color:'primary', count: 0},
    {val: 'Y', color:'primary', count: 0},
    {val: 'Z', color:'primary', count: 0}
  ];

  constructor(
    private alphabetCaptureCheck: AlphabetCaptureCheck,
    private authService: AuthService,
    private appState: AppState,
    private letterCheckingService: LetterCheckingService) {
  }



  ngOnInit() {
    this.appState.retreiveGestures().subscribe(result => {
      var gest = {}
<<<<<<< adfb5d08a49855ba74ae7f076c01519b5ad08c3a

      for (var name in result) {
        gest[name] = result[name];
      }
      let names = [];
      for (var n in gest) {
        names.push(n);
      }
      this.gestureNames = names;
=======
      result.forEach(r => {
        // console.log('@@@@@', r.data.name)
        let name = r.data.name;
        let data = r.data.gestureData;
        gest[name] = data;
        name && this.gestureNames.push(name);
      });

>>>>>>> (feat) - gesture recognition complete for learn page
      this.localState.gestures = gest;
    });
    this.mastered = JSON.parse(sessionStorage.getItem('mastered')) || [];
  }
  
  clicked(ltr) {
    ltr = ltr.toLowerCase();
    // this.GestureRecCtrl.disconnect();
    if (!this.ltrCtrlConnected) {
      this.letterCheckingService._initCheckingService();
      this.ltrCtrlConnected = true;
    }
    this.imageUrl = `assets/img/${ltr}.png`;
    this.clickedGesture = '';
    this.clickedLtr = ltr;
    this.riggedHand = false;
  }

  onTabChanges(tabNumber) {
    // console.log('selected tab = ', tabNumber);
  }

  checkLetter() {
    let idx = this.clickedLtr.charCodeAt(0) - 97;
    const letter = this.letters[idx];
    this.letterCheckingService.target = letter.val;
    let isCorrectLetter;
    this.startTimer = true;
    // this.inetrval = setInterval(() => {
    // }, 1000);

    setTimeout(() => {
      this.startTimer = false;
      this.changeLetterColor();
    }, 6000);
  }

  changeLetterColor() {
    let isCorrectLetter = this.letterCheckingService.getIsLetter();
    // console.log('isCorrectLetter = ', isCorrectLetter);

     let idx = this.clickedLtr.charCodeAt(0) - 97;
     const letter = this.letters[idx];

    if (isCorrectLetter) {
      // console.log('letter found');
      letter.count += 1;
      letter.color = 'white';
    } else {
      letter.color = 'warn';
    }
    sessionStorage.setItem(letter.val, letter.color);
    if (letter.count > 1) {
      this.mastered.push(letter.val);
    }
    sessionStorage.setItem('mastered', JSON.stringify(this.mastered));
  }
  showRiggedHand() {
    this.riggedHand = true;
    setTimeout(function() {
      document.dispatchEvent(new Event('ltContainerAdded'));
    }, 0);
    this.checkLetter();
  }

  ngOnDestroy() {
    this.letterCheckingService.controller.disconnect();
    this.letterCheckingService.target = '';
    this.GestureRecCtrl.disconnect();
  }

  //logic for gesture recognition below

  GestureRecCtrl = this.appState._initLeapController(this.deviceStopped_CB.bind(this), this.deviceStreaming_CB.bind(this));
  connected;
   deviceStopped_CB() {
      console.log('device has stopped streaming');
      this.connected = false;
      //TODO: handle UI 
    }

    deviceStreaming_CB() {
      console.log('device has started streaming');
      this.connected = true;
      //TODO: handle UI 
    }

   
  clickedGesture = '';
  trainer;
  LeapTrainer = require('../lib/leap-trainer.js');
  _initGestureRecognition(gestureName) {

    this.GestureRecCtrl.connect();
    
    // var player = this.GestureRecCtrl.plugins.playback.player;
    // console.log('llllllll', player)

    console.log('testing...');


    console.log(this.localState.gestures);
    var poses = {};
    this.gestureNames.forEach(name => {
      poses[name] = false;
    })
    console.log(poses, 'poses');
    this.trainer = new this.LeapTrainer.Controller({
      controller: this.GestureRecCtrl,
      gestures: this.localState.gestures,
      poses: poses,
      listening: true
    })

    this.trainer.on('gesture-unknown', (allHits, gesture) => {
      /*TODO: check to see what hit percentage is for clicked gesture
      ...if it is < 50% send message to user accordingly. ie: 'Not quite...'
      ...if it is <65% send message to user accordingly. ie: 'Almost...'
      */
      let percentage = allHits[gestureName];
      if (percentage <= 0.5) {
        console.log('Not quite...', allHits)
      } else {
        console.log('Almost...', allHits)
      }

    });

    this.trainer.on('gesture-recognized', (bestHit, closestGestureName, allHits) => {
      /*TODO: check to see if recognized gesture is the gesture clicked
      ...if so, then send message to user accordingly. ie: 'Congratulations!' or '{Gesture Name}!'
      */
      if (closestGestureName === gestureName) {
        console.log(gestureName + '!');
      } else {
        console.log('Not quite...')
        console.log('That\'s more like ', closestGestureName);
      }
    });
  }

  startGestureRecognition(gestureName) {
    this.clickedLtr = '';
    this.riggedHand = false;
    //TODO: playback plugin...
      //.....
     // this.GestureRecCtrl.use('playback');
     //  document.getElementById('connect-leap').remove();
    this.clickedGesture = gestureName;
    if (this.GestureRecCtrl.streaming()) {}
    else {
      this._initGestureRecognition(gestureName);
    }


  }

}
  // changeLetterColor() {
  //   let idx = this.clickedLtr.charCodeAt(0) - 97;
  //   const letter = this.letters[idx];
  //   if (this.alphabetCaptureCheck.getResult()) {
  //     letter.count += 1;
  //     letter.color = 'white';
  //   } else {
  //     letter.color = 'warn';
  //   }
  //   sessionStorage.setItem(letter.val, letter.color);
  //   // console.log(sessionStorage.getItem(letter.val));
  //   if (letter.count > 1) {
  //     this.mastered.push(letter.val);
  //     // console.log(this.mastered);
  //   }
  //   sessionStorage.setItem('mastered', JSON.stringify(this.mastered));
  // }
