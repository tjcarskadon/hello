import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';

@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ]
})

export class WelcomeContent implements OnInit {
  constructor(public appState: AppState) { }

  ngOnInit() { }

}
