import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service'

@Component({
  selector: 'spell',
  template: require('./spell.component.html'),
  styles: [ require('./spell.component.css') ],
  providers: [ AppState ]
})

export class Spell implements OnInit {
  leapCtrl;

  constructor(
    private appState: AppState,
    private authService: AuthService) {

    this.leapCtrl = this.appState._initLeapController();
    this.leapCtrl.connect();
  }

  ngOnInit() {
    //check authentication
    this.authService.authenticate('spell');
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

}
