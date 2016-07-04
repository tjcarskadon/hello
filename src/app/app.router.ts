import { provideRouter, RouterConfig } from '@angular/router';
import { Welcome } from './welcome'
import { Create } from './create'
import { Learn } from './learn'
import { Spell } from './spell'
import { Play } from './play'
import { Profile } from './profile'


export const routes: RouterConfig = [
  {path: '', component: Welcome},
  { path: 'welcome', component: Welcome },
  { path: 'create', component: Create },
  { path: 'learn', component: Learn },
  { path: 'spell', component: Spell },
  { path: 'play', component: Play },
  { path: 'profile', component: Profile }

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
