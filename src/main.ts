import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { UserService } from './app/user.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, UserService])
  .catch(err => console.error(err));

