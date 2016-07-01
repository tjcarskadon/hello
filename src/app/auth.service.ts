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
      console.log('LOGGED IN');
      this.router.navigateByUrl(['src/app/profile']);
      // return true;
    } else {
      console.log('LOGGED OUT')
      this.router.navigate(['Welcome']);
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.appState.authenticated = false;
    this.router.navigate(['Welcome']);
    console.log('I hope that I don\'t see you')
  }

  learnRoute() {
    this.appState.learn=true;
    this.appState.authenticated=true;
    this.router.navigate(['Learn']);
    console.log('authservice.learnRoute');

  }

}