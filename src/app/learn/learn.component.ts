import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../app.service';

@Component({
  selector: 'learn',
  template: require('./learn.component.html')
})
export class Learn implements OnInit {

  constructor(private authService: AuthService, private appState: AppState) {}

  ngOnInit() {
    console.log('this is the learn componenet')
    if (!this.authService.authenticate()) {
      this.appState.isDisabled = true;
      console.log('something')
    } else {
      console.log('I am authenticated');
    }

  }

}
