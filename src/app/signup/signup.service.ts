import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Signup } from './signup';

@Injectable() 

export class SignupService {
   
  private url: string = 'http://127.0.0.1:3333/users';

  constructor(private http: Http) {}

  saveUser(data: any): Observable<Response> {
    let body = JSON.stringify({
      email: data.email,
      password: data.password
    }); 

    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url, body, options).map(this.parseData).catch(this.handleError); 
  }

  private parseData(res: Response) {
      let body = res.json();
      return body.data ||  { };
  }

  private handleError(error: any) {
        let errBody = JSON.parse(error._body);
        let errMsg = errBody.meta.error.message
        console.error('11111', errMsg); 
        return Observable.throw(errMsg);
  }

}