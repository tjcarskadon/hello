import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'profile'
  selector: 'profile',  // <profile></profile>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./profile.html')
})
export class Profile {
  localState = { email1: '', email2: '', password1: '', password2: '', name: ''};
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) { }

  ngOnInit() {
    // console.log('hello `Profile` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitEmail(email1, email2) {
    // console.log('submitState', value);
    this.localState.email1 = email1;
    this.localState.email2 = email2;
    if (this.localState.email1 === this.localState.email2 && this.localState.email1.length) {
      this.appState.set('email', email1);
    } else {
      alert('Both fields must match.');
    }
  }

  submitPassword(pw1, pw2) {
    // console.log('submitState', value);
    this.localState.password1 = pw1;
    this.localState.password2 = pw2;
    if (this.localState.password1 === this.localState.password2) {
      if (this.localState.password1.length > 7) {
        this.appState.set('password', pw1);
      } else {
        alert('Password must be at least eight characters long.');
      }
    } else {
      alert('Both fields must match.');
    }
  }

  updateTitle(title) {
    console.log(this.appState.title);
    this.appState.title = title;
    console.log(this.appState.title);
  }

}