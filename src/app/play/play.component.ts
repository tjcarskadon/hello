import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LetterCheckingService } from '../LetterCheckingService.service';

@Component({
  selector: 'play',
  providers: [ LoginService, AuthService, AppState, LetterCheckingService ],
  template: require('./play.component.html'),
  styles: [ require('./play.component.css') ]
})

export class Play implements OnInit {
  leapCtrl;
  private results = [];

  constructor(
    private appState: AppState,
    public loginService: LoginService,
    private router: Router,
    public authService: AuthService,
    private letterCheckingService: LetterCheckingService ) {

  }

  connected;

  deviceStopped_CB() {
    this.connected = false;
  }

  deviceStreaming_CB() {
    this.connected = true;
  }

  ngOnInit() {
    this.authService.authenticate('play');
    this.letterCheckingService._initCheckingService();
    setInterval(() => {
      this.check();
    }, 1000);
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

  check() {
    let result = this.letterCheckingService.getLetter();
    this.results.push(result);
  }

}
