import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome',
  template: require('./welcome.component.html'),
  styles: [
    require('./welcome.component.css')
  ]
})
export class Welcome implements OnInit {

  hands: string = 'assets/img/hands.png'

  constructor() {}

  ngOnInit() {
  }

}
