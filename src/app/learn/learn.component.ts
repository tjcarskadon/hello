import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
})
export class Learn implements OnInit {

  public imageUrl:string = '';
  public clickedLtr:string;
  public showImgDiv:boolean = false;
  public showCaptureDiv:boolean = false;
  public color:string = 'warn';
  public score:number = 0;
  public letters = [
    {val: 'A', color:'primary'}, 
    {val: 'B', color:'primary'}, 
    {val: 'C', color:'primary'}, 
    {val: 'D', color:'primary'}, 
    {val: 'E', color:'primary'}, 
    {val: 'F', color:'primary'}, 
    {val: 'G', color:'primary'}, 
    {val: 'H', color:'primary'}, 
    {val: 'I', color:'primary'}, 
    {val: 'J', color:'primary'}, 
    {val: 'K', color:'primary'}, 
    {val: 'L', color:'primary'}, 
    {val: 'M', color:'primary'}, 
    {val: 'N', color:'primary'}, 
    {val: 'O', color:'primary'}, 
    {val: 'P', color:'primary'}, 
    {val: 'Q', color:'primary'}, 
    {val: 'R', color:'primary'}, 
    {val: 'S', color:'primary'}, 
    {val: 'T', color:'primary'}, 
    {val: 'U', color:'primary'}, 
    {val: 'V', color:'primary'}, 
    {val: 'W', color:'primary'}, 
    {val: 'X', color:'primary'}, 
    {val: 'Y', color:'primary'}, 
    {val: 'Z', color:'primary'}
  ];

  constructor() {}

  ngOnInit() {
  }

  changeLetterColor() {
    var idx = (this.clickedLtr.charCodeAt()) - 65;
    this.letters[idx].color = 'warn';
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
