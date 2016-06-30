import { Injectable } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router-deprecated';

@Injectable() 

export class AuthService {
  constructor(private appState: AppState, private router: Router) {}

  authenticate () {
    //get token
    let tkn: string = localStorage.getItem('tkn')
    let exp: Date = new Date(localStorage.getItem('exp'));
    let currentDate: Date = new Date();

    if(tkn && exp > currentDate) {
      //logged in
      this.appState.authenticated = true;
    } else {
      //not logged in so just redirect to welcome
      this.appState.authenticated = false;
      this.router.navigate(['Welcome']);
    }
  }

  logout() {
    
  }
}