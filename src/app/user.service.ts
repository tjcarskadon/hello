import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  // mock user authenticated state for dev purposes
  // true shows dashboard
  // false shows welcome
  authenticated: boolean = true;

  constructor() {}

}
