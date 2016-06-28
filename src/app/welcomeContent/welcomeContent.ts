import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
@Component({
  selector: 'welcomeContent',
  template: require('./welcomeContent.html'),
  styles: [require('./welcomeContent.css')]
})

export class WelcomeContent implements OnInit {
  constructor() {}

  ngOnInit() {}

}