import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
})
export class Learn implements OnInit {

  public imageUrl:string = '';
  public clickedLtr:string;

  constructor() {}

  ngOnInit() {
  }

  clicked(ltr) {
    this.imageUrl = `assets/img/${ltr}.png`;
    this.clickedLtr = ltr;
  }

}
