import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service'
import { WordsService } from './wordsService.service';


@Component({
  selector: 'spell',
  template: require('./spell.component.html'),
  styles: [ require('./spell.component.css') ],
  providers: [AppState, WordsService]
})

export class Spell implements OnInit {
  leapCtrl;

  constructor(
    private appState: AppState,
    private authService: AuthService) {

    this.leapCtrl = this.appState._initLeapController();
    this.leapCtrl.connect();
  }
   
    private spellingWord:string = '';

  ngOnInit() {
    this.spellingWord = this.wordsService.returnRandomWord();
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

}
