import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';

@Component({
  selector: 'signup',
  directives: [ FORM_DIRECTIVES ],
  template: require('./signup.html'),
  styles: [require('./signup.css')]
})

export class Signup implements OnInit {
  signupForm: ControlGroup;

  constructor(public appState: AppState, fb: FormBuilder) {
    this.signupForm = fb.group({
      'email': [],
      'password': [],
      'confirm': []
    })
  }
  ngOnInit() {}  

  onSubmit(form: any) {
    console.log('success', form);
  }
  loginRoute () {
    this.appState.login = true;
    this.appState.signup = false;
  }

  
}