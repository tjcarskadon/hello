import { Component, OnInit } from '@angular/core';
import { WelcomeContent } from '../welcomeContent/welcomeContent.ts';

@Component({
  selector: 'welcome',
  directives: [ WelcomeContent ],
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
