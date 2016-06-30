import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';

@Injectable()
export class AppState {
 authenticated: boolean = false;
 signup: boolean = false;
 myName: string = 'Richard';
 title: string = 'hello.';
 login: boolean = false;

  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  @HmrState() _state = { };

  constructor() {}

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  welcome() {
    this.signup = false;
    this.login = false;
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this._state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  _initRiggedHand() {
    require('./lib/leap-plugins.js');
    require('./lib/riggedHand.js');
  }


}
