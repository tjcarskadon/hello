import { Injectable } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';

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
       console.log(this.appState._state.learn, '11111');

      this.appState.set('authenticated', true);
      // this.appState.learn =true;
      this.router.navigate(['/profile']);
      // this.appState.landing = 'profile';
      return true;
    } else {
      console.log('LOGGED OUT')
      this.router.navigate(['/welcome']);
      return false;
    }
  }

  logout() {
    localStorage.clear();
    console.log('logging out!');
    this.appState.set('authenticated', false);
    console.log('navigating to welcome...');
    this.router.navigate(['/welcome']);
  }

  learnRoute() {
    // this.appState.learn=true;
    // this.appState.isDisabled=true;
    // this.appState.landing='learn'
    // this.appState.authenticated=true;
    // this.router.navigate(['Learn']);
  }

}