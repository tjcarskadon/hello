import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { LoginService } from '../login.service';
import { Router, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
  styles: [require('./login.css')]
})

export class Login implements OnInit {
  myForm: ControlGroup;

  constructor(public loginService: LoginService, 
    private router: Router, fb: FormBuilder, public appState: AppState) {
    this.myForm = fb.group({
      'email': [],
      'password': []
    })
  }
  

  ngOnInit() {
    
  }  

  onSubmit(form: any): void {
    this.loginService.login(form)
                           .subscribe(
                            result => {
                              localStorage.setItem('tkn', result[0].access_token);
                              localStorage.setItem('exp', result[0].expires_at);
                              this.appState.authenticated=true;
                              this.router.navigate(['/Profile']);
                            },
                            error => console.log(error));
  }
}