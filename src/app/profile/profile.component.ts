import { Component } from '@angular/core';
import { AuthService} from '../auth.service'
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  selector: 'profile',
  providers: [ Title, AppState ],
  directives: [ XLarge ],
  pipes: [ ],
  styles: [ require('./profile.css') ],
  template: require('./profile.html')
})

export class Profile {
  localState = { email1: '', email2: '', password1: '', password2: '', name: ''};

  constructor(
    // public appState: AppState,
    public title: Title,
    private authService: AuthService) { 


  }

  ngOnInit() {
    // console.log('Profile component loaded.');
    // this.title.getData().subscribe(data => this.data = data);

    this.authService.authenticate('profile');
  }

  updateEmail(email1, email2) {
    // console.log('updateState', value);
    this.localState.email1 = email1;
    this.localState.email2 = email2;
    if (this.localState.email1 === this.localState.email2 && this.localState.email1.length) {
      // this.appState.set('email', email1);
    } else {
      alert('Both fields must match.');
    }
  }

  updatePassword(pw1, pw2) {
    // console.log('updateState', value);
    this.localState.password1 = pw1;
    this.localState.password2 = pw2;
    if (this.localState.password1 === this.localState.password2) {
      if (this.localState.password1.length > 7) {
        // this.appState.set('password', pw1);
      } else {
        alert('Password must be at least eight characters long.');
      }
    } else {
      alert('Both fields must match.');
    }
  }

  // updateTitle(title) {
  //   console.log(this.appState._state.title);
  //   this.appState._state.title = title;
  //   console.log(this.appState._state.title);
  // }

}
