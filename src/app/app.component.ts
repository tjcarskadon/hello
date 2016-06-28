// Import Angular 2 component and routing
import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';

// Import routes we defined
// import { APP_ROUTER_PROVIDERS } from './app.routes';

// Import stateful data
import { UserService } from './user.service';

// Import custom components to be used as directives
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    // ROUTER_DIRECTIVES,
    WelcomeComponent,
    DashboardComponent
  ]
})

export class AppComponent {
  constructor(public userService:UserService) {
    console.log(userService);
  }
  title = 'root app works!';
}
