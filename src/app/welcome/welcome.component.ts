import { Component, OnInit } from '@angular/core';
import { WelcomeContent } from '../welcomeContent/welcomeContent.ts';
import { Signup } from '../signup/signup.ts'
import { Login } from '../login/login.ts'
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { SignupService } from '../signup/signup.service';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService } from '../auth.service';


@Component({
  selector: 'welcome',
  directives: [ WelcomeContent, Signup, Login ],
  providers: [ LoginService, SignupService, ROUTER_PROVIDERS],
  template: require('./welcome.component.html'),
  styles: [
    require('./welcome.component.css')
  ]
})

export class Welcome implements OnInit {

  hands: string = 'assets/img/hands.png'
  bg: string = 'assets/img/bg.png'
<<<<<<< c17cc304953e3dc815892ae62b6acf4f2c3a0f9c
  constructor(public appState: AppState) { }
=======
  constructor(public appState: AppState, private authService: AuthService) {}
>>>>>>> (feat) Local authentication

  ngOnInit() {
    
    this.authService.authenticate();
    
  }

}
