import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';

@Component({
  selector: 'login',
  template: require('./login.html'),
  styles: [require('./login.css')]
})

export class Login implements OnInit {
  constructor(public appState: AppState) {}
  ngOnInit() {}  

  signupRoute() {
    this.appState.login = false;
    this.appState.signup = true;
  }

}