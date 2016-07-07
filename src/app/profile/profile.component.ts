import { Component } from '@angular/core';
import { AuthService} from '../auth.service'
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'profile'
  selector: 'profile',  // <profile></profile>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title, AppState
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
  localState = { email1: '', email2: '', password1: '', password2: '', name: '', userId: ''};
  // TypeScript public modifiers
  // urls = 'http://52.90.139.255:3333/users?email=';
  // urls = 'http://192.168.99.100:3333/users?email=';
  urls = 'http://127.0.0.1:3333/users?email=';
  public url: string = this.urls;

  constructor(
    // public appState: AppState,
    public title: Title,
    private authService: AuthService,
    private http: Http) { 


  }

  ngOnInit() {
    // console.log('Profile component loaded.');
    // this.title.getData().subscribe(data => this.data = data);

    this.authService.authenticate('profile');
    // console.log(history.state);
    this.localState.name=window.history.state.email;
  }

  submitEmail(email1, email2) {
    // console.log('submitState', value);
    //get the user id

    this.localState.email1 = email1;
    this.localState.email2 = email2;
    let url = this.url + this.localState.name;
    console.log('url', url);
    if (this.localState.email1 === this.localState.email2 && this.localState.email1.length) {
      this.http.get(url).forEach(response => {
        let r = JSON.parse(response._body);
        this.localState.userId = r[0].id;
      }).catch(error => console.log(error));

      //left off here --- need to add the url plus id to make the put
     // let putUrl = this.url + 

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
        // this.appState.set('password', pw1);
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
