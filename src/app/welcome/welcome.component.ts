import { Component, OnInit } from '@angular/core';
import { WelcomeContent } from '../welcomeContent/welcomeContent.ts';
import { Signup } from '../signup/signup.ts';
import { Login } from '../login/login.ts';
import { Profile } from '../profile/profile.component';
import { Learn } from '../learn/learn.component';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { SignupService } from '../signup/signup.service';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService } from '../auth.service';
import { NgSwitch, NgSwitchDefault, NgSwitchWhen } from '@angular/common';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'welcome',
  directives: [ WelcomeContent, Signup, Login, NgSwitch, NgSwitchDefault, NgSwitchWhen, Profile, Learn ],
  providers: [ LoginService, SignupService, ROUTER_PROVIDERS, AuthService],
  template: require('./welcome.component.html'),
  styles: [
    require('./welcome.component.css')
  ]
})
export class Welcome implements OnInit {

  hands: string = 'assets/img/hands.png'
  bg: string = 'assets/img/bg.png'
  constructor(public appState: AppState, private authService: AuthService) {}

  ngOnInit() {
    console.log('this is the welcome component');
    console.log(this.appState.landing)
    this.authService.authenticate();
    
  }

}
