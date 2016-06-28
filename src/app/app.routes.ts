// Import Angular 2 routing
import { provideRouter, RouterConfig } from '@angular/router';

// Import custom components to be routed to
import { AppComponent, environment } from './';
import { WelcomeComponent } from './welcome/';
import { DashboardComponent } from './dashboard/';
import { HomeComponent } from './dashboard/home';
import { LearnComponent } from './dashboard/learn';
import { SpellComponent } from './dashboard/spell';
import { PlayComponent } from './dashboard/play';
import { CreateComponent } from './dashboard/create';
// import { ConnectComponent } from './dashboard/connect';

// Define routes
export const routes: RouterConfig = [
  // { path: 'welcome', component: WelcomeComponent },
  // { path: 'dashboard', component: DashboardComponent,
    // children: [
      { path: 'home', component: HomeComponent },
      { path: 'learn', component: LearnComponent },
      { path: 'spell', component: SpellComponent },
      { path: 'play', component: PlayComponent },
      { path: 'create', component: CreateComponent }
    // ] },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
