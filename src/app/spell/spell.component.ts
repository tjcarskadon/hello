import { Component, OnInit } from '@angular/core';
// import { LeapViewer } from '../leapViewer.service';
import { AppState } from '../app.service';

@Component({
  selector: 'spell',
  template: require('./spell.component.html'),
  styles: [require('./spell.component.css')],
  providers: [AppState]
})

export class Spell implements OnInit {

  constructor(
    private appState: AppState) {
    this.appState._initLeapController();
  }

  ngOnInit() { }

}
