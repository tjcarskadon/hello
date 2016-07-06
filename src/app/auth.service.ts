import { Injectable } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class AuthService {

  constructor(
    private appState: AppState,
    private router: Router,
    private http: Http) { }


  authenticate (page) {
    //get token

    let exp: Date = new Date(localStorage.getItem('exp'));
    let currentDate: Date = new Date();
    let tkn: string = localStorage.getItem('tkn')
    let url: string = `http://52.90.139.255:3333/logins?access_token=${tkn}`;
    // let url: string = 'http://127.0.0.1:3333/logins?access_token=' + tkn;

     if (tkn) {
      this.http.get(url).forEach(response => {
        let a = JSON.parse(response._body);
        // console.log(a)
        if(a.data[0] !== "Authorized") {
          this.router.navigate(['/welcome']);
          window.history.replaceState(null, null, '');
        } else {
          this.appState.set('authenticated', true);
          this.appState.set('isDisabled', false);
          this.router.navigate(['/'+page]);
          window.history.pushState(this.appState._state, null, page);
        }
      }).catch(err => console.log(err));
     } else {
        this.router.navigate(['/welcome']);
        window.history.replaceState(null, null, '');
     }



    // if(tkn && exp > currentDate) {
    //   //logged in
    //   console.log('LOGGED IN');
    //    console.log(this.appState._state.learnPage, '11111');

    //   this.appState.set('authenticated', true);
    //   // this.appState.learn =true;
    //   this.router.navigate(['/'+page]);
    //   window.history.pushState(null, null, page);
    //   // this.appState.landing = 'profile';
    //   return true;
    // } else {
    //   console.log('LOGGED OUT', exp, tkn)
    //   this.router.navigate(['/welcome']);
    //   window.history.replaceState(null, null, '');

    //   return false;
    // }
  }

  logout() {
    let tkn: string = localStorage.getItem('tkn')
    let url: string = 'http://127.0.0.1:3333/access_tokens?access_token=' + tkn;
    localStorage.clear();
    this.appState.set('authenticated', false);
    // console.log('navigating to welcome...');

    this.http.get(url).forEach(x => console.log('logged out')).catch(err => console.log(err));
    this.router.navigate(['/welcome']);
    window.history.pushState(this.appState._state, null, '');
  }

  learnRoute() {
    // this.appState.learn=true;
    // this.appState.isDisabled=true;
    // this.appState.landing='learn'
    // this.appState.authenticated=true;
    // this.router.navigate(['Learn']);
  }

}
