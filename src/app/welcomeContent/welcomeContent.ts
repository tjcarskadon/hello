import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';
import { AuthService } from '../auth.service';
import {WelcomeStateService} from '../welcomeState/welcomeState.service';
import { Router } from '@angular/router';


@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ] 
})

export class WelcomeContent implements OnInit {
  constructor(public appState: AppState, public authService: AuthService, private ws: WelcomeStateService, private router: Router) { }

  ngOnInit() { 
    console.log('this is the welcomeContents componenet', this.appState._state);
  }

  routeToLearn() {
    this.router.navigateByUrl('/learn');
  }
  
}
