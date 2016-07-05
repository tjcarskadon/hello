/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig } from '@angular/router-deprecated';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AppState } from './app.service';
import { Profile } from './profile';
// import { Home } from './home';
import { Welcome } from './welcome';
import { Learn } from './learn';
import { Spell } from './spell';
import { Play } from './play';
import { Create } from './create';
import { RouterActive } from './router-active';
import { AuthService } from './auth.service'
import './rxjs-operators';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [AuthService, AppState],
  directives: [ ROUTER_DIRECTIVES, Welcome, Profile, Learn, Spell, Play, Create ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: require('./app.html')
})

export class App {
  angularclassLogo = 'assets/img/asl-d.png';
  loading = false;
  name = 'hello.';
  url = 'https://github.com/digi-talk/hello';
  bg: string = 'assets/img/bg.png'
  authenticated;
  navOptions = ['Profile', 'Learn', 'Spell', 'Play', 'Create'];

  constructor(public appState: AppState, public authService: AuthService, private router: Router) {

  }

  ngDoCheck() {
    this.authenticated = this.appState.get('authenticated');
    console.log('changes detected', this.appState.get('authenticated'));
  }

  navToPage(page) {
    page = page.toLowerCase();
    console.log('/'+page);
    this.router.navigate(['/'+page]);
  }

  ngOnInit() {
    // console.log('Initial App State', this.appState.state);
    console.log('app comp loaded', this.appState.get('authenticated'));
  }

  logout() {
    this.appState.set('authenticated', false);
    sessionStorage.clear();
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
  
// @RouteConfig([
//   { path: '/',        name: 'Welcome', component: Welcome, useAsDefault: true },
//   { path: '/profile',   name: 'Profile',   loader: () => require('es6-promise!./profile')('Profile') },  
//   { path: 'learn',   name: 'Learn',   component: Learn},
//   { path: '/spell',   name: 'Spell',   loader: () => require('es6-promise!./spell')('Spell') },
//   { path: '/play',    name: 'Play',    loader: () => require('es6-promise!./play')('Play') },
//   { path: '/create',  name: 'Create',  loader: () => require('es6-promise!./create')('Create') },
//   { path: '/welcome',  name: 'Welcome',  loader: () => require('es6-promise!./welcome')('Welcome') }
// ])
