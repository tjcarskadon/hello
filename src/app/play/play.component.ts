import { Component, OnInit } from '@angular/core';
import { LeapViewer } from '../leapViewer.service';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { Router, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService } from '../auth.service';

@Component({
  selector: 'play',
  providers: [LoginService, AuthService, AppState, LeapViewer],
  template: require('./play.component.html')
})

export class Play implements OnInit {

  state = this.leapViewer._state;

  constructor(
    private appState: AppState,
    private leapViewer: LeapViewer,
    public loginService: LoginService, 
    private router: Router, 
    public authService: AuthService) {
    
    this.leapViewer._initLeapHand();
  }

  ngOnInit() {
    if(!this.authService.authenticate()) {
      this.router.navigate(['Welcome']);
    }
  }

}