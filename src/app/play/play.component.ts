import { Component, OnInit } from '@angular/core';
// import { LeapViewer } from '../leapViewer.service';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'play',
  providers: [LoginService, AuthService, AppState],
  template: require('./play.component.html')
})

export class Play implements OnInit {

  constructor(
    private appState: AppState,
    public loginService: LoginService, 
    private router: Router, 
    public authService: AuthService) {
    
    // this.appState._initLeapController();
  }

  ngOnInit() {
    this.authService.authenticate('play');


  }

}