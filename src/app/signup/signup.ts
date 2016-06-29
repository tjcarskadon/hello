import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';

@Component({
  selector: 'signup',
  template: require('./signup.html'),
  styles: [require('./signup.css')]
})

export class Signup implements OnInit {
  constructor(public appState: AppState) {}
  ngOnInit() {}  

  loginRoute () {
    this.appState.login = true;
    this.appState.signup = false;
  }

  
}