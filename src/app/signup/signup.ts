import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import {WelcomeStateService} from '../welcomeState/welcomeState.service'
import { SignupService } from './signup.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'signup',
  directives: [ FORM_DIRECTIVES ],
  template: require('./signup.html'),
  styles: [require('./signup.css')]
})

export class Signup implements OnInit {
  signupForm: ControlGroup;

  constructor(public signupService: SignupService, public appState: AppState, fb: FormBuilder, private ws: WelcomeStateService, private http: Http) {
    this.signupForm = fb.group({
      'email': [],
      'password': [],
      'confirm': []
    })
  }
  ngOnInit() {}  

  onSubmit(form: any) {
    if ( form.password !== form.confirm || !form.password || !form.email) {
       //do something else here to handle the error
       //make sure to handle the form fields
      console.log('no match');
      return;
    }
    this.signupService.saveUser(form)
                       .subscribe(
                         result => console.log('signupService result:', result),
                         error => console.log('signupService error:', error));
  }

  googleSignIn() {
    // console.log('google signin....');
    // this.http.get('http://localhost:8080/auth/google')
    //   .then(r => console.log('r', r))
    //   .catch(e => console.log('e:', e));

  }

  parseData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  //<a href="http://localhost:8080/auth/google">
}