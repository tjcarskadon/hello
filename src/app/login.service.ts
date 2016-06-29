import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Login } from './login/login.ts';

@Injectable () 
export class LoginService {
  
  constructor(private http: Http) {}

  private url = 'http://127.0.0.1:3333/users?username=tj';

  checkUser(): Observable<Response> {
    return this.http.get(this.url).map(this.parseData).catch(this.handleError);
  }

  private parseData(res: Response) {
      let body = res.json();
      return body.data ||  { };
  }

  private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);

  }
}