import { Injectable } from '@angular/core';

@Injectable()
export class WordsService {

  private words = ['Sun', 'Moon', 'Stars', 'Earth'];

  constructor() {}

  getAllWords () {
    // implement get request from database
    // this.words = whatever returns from get request

  }

  returnRandomWord() {   
    let random = Math.floor(Math.random() * 3);
    return this.words[random]; 
  }

}