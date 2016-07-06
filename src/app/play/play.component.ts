import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'play',
  providers: [ LoginService, AuthService, AppState ],
  template: require('./play.component.html'),
  styles: [ require('./play.component.css') ]
})

export class Play implements OnInit {
  leapCtrl;

  constructor(
    private appState: AppState,
    public loginService: LoginService,
    private router: Router,
    public authService: AuthService ) {

    this.leapCtrl = this.appState._initLeapController();
    this.leapCtrl.connect();
  }

  ngOnInit() {
    this.authService.authenticate('play');
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

}
