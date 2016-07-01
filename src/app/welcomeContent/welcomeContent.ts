import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';
import { AuthService } from '../auth.service';
// import { RouteConfig, Router } from '@angular/router-deprecated'

@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ]
})

export class WelcomeContent implements OnInit {
  constructor(public appState: AppState, public authService: AuthService) { }

  ngOnInit() { 
    console.log('this is the welcomeContents componenet  ')
  }

}
