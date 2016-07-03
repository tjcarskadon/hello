import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';
import { AuthService } from '../auth.service';
import {WelcomeStateService} from '../welcomeState/welcomeState.service';

@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ] 
})

export class WelcomeContent implements OnInit {
  constructor(public appState: AppState, public authService: AuthService, private ws: WelcomeStateService) { }

  ngOnInit() { 
    console.log('this is the welcomeContents componenet', this.appState._state);
  }
  
}
