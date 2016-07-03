import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { LoginService } from '../login.service';
import { Router, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {WelcomeStateService} from '../welcomeState/welcomeState.service';

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
  styles: [require('./login.css')]
})

export class Login implements OnInit {
  myForm: ControlGroup;

  constructor(public loginService: LoginService, 
    private router: Router, fb: FormBuilder, public appState: AppState, private ws: WelcomeStateService) {
    this.myForm = fb.group({
      'email': [],
      'password': []
    })
  }
  

  ngOnInit() {
    
  }  

  onSubmit(form: any): void {
    console.log('submitting')
    this.loginService.login(form)
                           .subscribe(
                            result => {
                              localStorage.setItem('tkn', result[0].access_token);
                              localStorage.setItem('exp', result[0].expires_at);
                              this.appState.set("landing", 'profile');
                              this.appState.set("authenticated", true);
                              this.appState.set('learn', true);
                              this.appState.set("isDisabled", false);
                              this.router.navigate(['Profile']);
                            },
                            error => console.log(error));
  }
}