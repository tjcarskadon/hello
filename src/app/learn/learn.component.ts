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
  public color:string = 'blue';
  public score:number = 0;

  constructor() {}

  ngOnInit() {
  }

  changeLetterColor() {

  }

  clicked(ltr) {
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
