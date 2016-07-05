import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service'
import { WordsService } from './wordsService.service';
import { LetterCheckingService } from './LetterCheckingService.service';


@Component({
  selector: 'spell',
  template: require('./spell.component.html'),
  styles: [require('./spell.component.css')],
  providers: [AppState, WordsService, LetterCheckingService],
})

export class Spell implements OnInit {
  leapCtrl;

  constructor(
    private appState: AppState,
    private authService: AuthService) {}

  private state = this.leapViewer._state;
  private spellingWord:string = '';
  private showWord:boolean = false;
  private showSkip:boolean = false;
  private skippedWords = [];
  private capturedLetter:string = '';
  private capturedLetterColor:string = '';
  private nextLetter:string = '';
  private nextLetterIndex:number = 0;
  private rightPanelWord:string = '';
  private wordPercent:number = 0;
  private correctWords = [];

  ngOnInit() {
    this.nextWord();
  }

  nextWord() {
    this.rightPanelWord = '';
    this.nextLetterIndex = 0;
    this.nextLetter = '';
    this.wordPercent = 0;
    this.skippedWords.push(this.spellingWord);
    this.spellingWord = this.wordsService.returnRandomWord();
    this.nextLetter = this.spellingWord[this.nextLetterIndex].toLowerCase();
    let spell = this;
    setTimeout(() => {
      spell.showWord = true;
    }, 2000);
    setTimeout(() => {
      spell.showSkip = true;
    }, 3000);
    setInterval(() => {
      this.checkLetter();
    }, 1000);
  }

  skippedClick(event) {
    console.log(event.target.innerText);
  }

  correctClick(event) {
    console.log(event.target.innerText);
  }

  checkLetter() {
    this.capturedLetter = this.letterCheckingService.getLetter();
    if (this.capturedLetter === this.nextLetter) {
      this.capturedLetterColor = 'green';
      this.rightPanelWord += this.capturedLetter.toUpperCase();
      this.wordPercent = (this.rightPanelWord.length / this.spellingWord.length) * 100;
      if (this.nextLetterIndex < this.spellingWord.length - 1) {
        this.nextLetterIndex ++;
        this.nextLetter = this.spellingWord[this.nextLetterIndex];
      } else {
        this.correctWords.push(this.rightPanelWord);
        this.nextWord();
      }
    } else {
      this.capturedLetterColor = 'red';
    }

  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

}
