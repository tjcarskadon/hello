import { Component, OnInit } from '@angular/core';
import { AlphabetCaptureCheck } from './AlphabetCaptureCheck.service'

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
  providers: [AlphabetCaptureCheck]
})
export class Learn implements OnInit {

  public imageUrl:string = '';
  public clickedLtr:string;
  public showImgDiv:boolean = false;
  public showCaptureDiv:boolean = false;
  public color:string = 'warn';
  public mastered = [];
  public letters = [
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

  constructor( private alphabetCaptureCheck: AlphabetCaptureCheck) {}

  ngOnInit() {
  }

  changeLetterColor() {
    var idx = this.clickedLtr.charCodeAt() - 97;
    if (this.alphabetCaptureCheck.getResult()) {
      this.letters[idx].color = 'white';
      this.letters[idx].count += 1;
    } else {
      this.letters[idx].color = 'warn';
    }
    if (this.letters[idx].count > 1) {
      this.mastered.push(this.letters[idx].val);
      console.log(this.mastered);
    }
  }

  clicked(ltr) {
    ltr = ltr.toLowerCase();
    this.imageUrl = `assets/img/${ltr}.png`;
    this.clickedLtr = ltr;
    this.showImgDiv = true;
  }

  hideImgDiv() {
    this.showImgDiv = false;
    this.showCaptureDiv = true;
  }

  hideCaptureDiv() {
    this.showCaptureDiv = false;
    this.changeLetterColor();

  }

}
