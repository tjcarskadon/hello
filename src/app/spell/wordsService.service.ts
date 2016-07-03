import { Injectable } from '@angular/core';

@Injectable()
export class WordsService {

  private words = ['Cab', 'Loud', 'Cloud', 'Would', 'Seed', 'Feed', 'Fade', 'Leaf', 'Deal', 'Seal', 'Bulb', 'Loaf', 'Bowl', 'Soul', 'Cow', 'Loose', 'Fuse', 'Cold', 'Sold', 'Face', 'Safe', 'Cuddle'];
  // a,b,c,d,e,f,(gh),l,o,s,u,w.
  private used = [];

  constructor() {
  }

  getAllWords () {
    // implement get request from database
    // this.words = whatever returns from get request
  }

  returnRandomWord() {   
    let random = this.getRandomIndex();
    let word = this.words[random];
    while (this.used.indexOf(word) >= 0) {
      random = this.getRandomIndex();
      word = this.words[random];
    }
    this.used.push(word);
    console.log(this.used);
    return word;    
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 22);
  }
}