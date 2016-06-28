// Import Angular 2 component
import { Component, OnInit } from '@angular/core';

// Import Angular 2 routing
import { ROUTER_DIRECTIVES } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from '../app.routes';

// Import Material 2 packages
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

// import { UserService } from './user.service';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { SpellComponent } from './spell/spell.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
// import { ConnectComponent } from './dashboard/connect';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [
    DashboardComponent,
    HomeComponent,
    LearnComponent,
    SpellComponent,
    PlayComponent,
    CreateComponent,
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  providers: [MdIconRegistry, MdRadioDispatcher]
})
export class DashboardComponent implements OnInit {

  constructor() {

  }

  goHome() {
    // this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
