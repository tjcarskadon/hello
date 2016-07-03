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
    private authService: AuthService) {}

  private state = this.leapViewer._state;
  private spellingWord:string = '';
  private showWord = false;
  private showSkip = false;

  ngOnInit() {
    this.nextWord();
  }

  nextWord() {
    this.spellingWord = this.wordsService.returnRandomWord();
    let spell = this;
    setTimeout(function() {
      spell.showWord = true;
    }, 2000);
    setTimeout(function() {
      spell.showSkip = true;
    }, 3000);
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

}
