import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
  styles: [require('./login.css')]
})

export class Login implements OnInit {
  myForm: ControlGroup;

  constructor(private loginService: LoginService, fb: FormBuilder, public appState: AppState) {
    this.myForm = fb.group({
      'email': [],
      'password': []
    })
  }
  

  ngOnInit() {}  

  onSubmit(form: any): void {
    console.log('success', form);
    this.checkUser();
  }

  checkUser() {
    this.loginService.checkUser().subscribe(
                                  user => console.log('user:', user),
                                  error => console.log('ERROR:',error))
  }

  signupRoute() {
    this.appState.login = false;
    this.appState.signup = true;
  }



}