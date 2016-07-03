import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';
import { AuthService } from '../auth.service';
import {WelcomeStateService} from '../welcomeState/welcomeState.service';
import { RouteConfig, Router } from '@angular/router-deprecated'
import { Learn} from '../learn'

@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ] 
  // providers: [WelcomeStateService]
})

@RouteConfig([
  { path: 'learn',   name: 'Learn',   component: Learn}
])

export class WelcomeContent implements OnInit {
  constructor(public appState: AppState, public authService: AuthService, private ws: WelcomeStateService) { }

  ngOnInit() { 
    console.log('this is the welcomeContents componenet', this.appState._state);
  }
  
}
