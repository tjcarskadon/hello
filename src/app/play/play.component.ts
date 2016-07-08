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
  checkInterval;
  private intervalId;
  private checkLetterTimer;

  constructor(
    private appState: AppState,
    public loginService: LoginService,
    private router: Router,
    public authService: AuthService,
    private letterCheckingService: LetterCheckingService ) {
  }

  connected = false;

  deviceStopped_CB() {
    this.connected = false;
  }

  deviceStreaming_CB() {
    this.connected = true;
  }

  ngOnInit() {
    this.authService.authenticate('play');
    this.letterCheckingService._initCheckingService();
    this.checkLetterTimer = setInterval(() => {
      this.check();
    }, 1000);
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

  check() {
    console.log('results = ', this.results);
    let result = this.letterCheckingService.getLetter();
    if (result !== this.results[this.results.length - 1] && result !== '') {
      this.results.push(result);
    }
  }

  ngOnDestroy() {
    this.letterCheckingService.controller.disconnect();
    clearInterval(this.checkLetterTimer);
  }

}
