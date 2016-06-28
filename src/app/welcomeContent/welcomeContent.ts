import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcomeContent',
  template: require('./welcomeContent.html'),
  styles: [require('./welcomeContent.css')]
})

export class WelcomeContent implements OnInit {
  constructor() {}

  ngOnInit() {}

}