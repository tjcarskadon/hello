import { Component, OnInit } from '@angular/core';
import { WelcomeContent } from '../welcomeContent/welcomeContent.ts';
import { Signup } from '../signup/signup.ts'
import { Login } from '../login/login.ts'
import { AppState } from '../app.service';

@Component({
  selector: 'welcome',
  directives: [ WelcomeContent, Signup, Login ],
  template: require('./welcome.component.html'),
  styles: [
    require('./welcome.component.css')
  ]
})

export class Welcome implements OnInit {

  hands: string = 'assets/img/hands.png'
  bg: string = 'assets/img/bg.png'
  constructor(public appState: AppState) { }

  ngOnInit() {}

}
