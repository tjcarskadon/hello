import { Component, OnInit } from '@angular/core';
import { AlphabetCaptureCheck } from './AlphabetCaptureCheck.service';
import { AuthService } from '../auth.service';
import { AppState } from '../app.service';
import { LetterCheckingService } from '../LetterCheckingService.service';

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
  providers: [ AlphabetCaptureCheck, AppState, LetterCheckingService ]
})

export class Learn implements OnInit {

  private localState = {gestures: {}, temp: {}};
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

      for (var name in result) {
        gest[name] = result[name];
      }
      let names = [];
      for (var n in gest) {
        names.push(n);
      }
      this.gestureNames = names;
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
    this.clickedLtr = ltr;
    this.riggedHand = false;
  }

  //let isLetter = this._.debounce(this.letterCheckingService.getIsLetter, 1000);

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
  }

}
