import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { HmrState } from 'angular2-hmr';

@Injectable()

export class AppState {
  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  _state = {
    authenticated: false,
    learnPage: false,
    isDisabled: true,
    myName: 'Richard',
    title: 'hello',
    google: false
  };

  token = localStorage.getItem('tkn');
  urls = `http://52.90.139.255:3333/gestures?access_tokens=${this.token}`;
  public gestureUrl: string = this.urls;

  constructor(private http: Http) {
    // retrieve gestures from database and store in client's localStorage
    this.retreiveGestures().subscribe(result => {
       var gest = {}
       result.forEach(r => {
         // console.log('@@@@@', r.data.name)
         let name = r.data.name;
         let data = r.data.gestureData;
         // console.log(name, data);
         gest[name] = data;
       });
         this.set('gestures', gest);
         
         let path = window.location.href.split('/');
         window.history.pushState(this.appState._state, null, path[path.length -1]);
         // console.log(history.state);
      // localStorage.setItem('gestures', JSON.stringify(result));
    });
  }

  retreiveGestures(): Observable<Response[]> {
    return this.http.get(this.gestureUrl).map(this.parseData).catch(this.handleError);
  }

  private parseData(res: Response) {
    let body = res.json();
    return body.data ||  { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this._state;
    return state[prop] !== undefined ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  _initLeapController() {
    var Leap = require('leapjs');
    require('./lib/leap-plugins.js');
    require('./lib/riggedHand.js');
    var controller = new Leap.Controller();

    //connect ctrl at the end of logic
    controller.use('riggedHand');
      // .on('connect', () => console.log('Controller connected.'));
    return controller;
  }
}
