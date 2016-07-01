import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService } from '../auth.service';

@Component({
  selector: 'play',
  providers: [LoginService, AuthService],
  template: require('./play.component.html')
})
export class Play implements OnInit {

  constructor(public loginService: LoginService, private router: Router, public authService: AuthService) {}

  ngOnInit() {
    if(!this.authService.authenticate()) {
      this.router.navigate(['Welcome']);
    }
  }

}
