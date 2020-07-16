import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    // This is optional to know how to change content-type
    //==========================================================
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    //==========================================================


    /*
    the post method returns an observable (as an object)
    We need to pass the response through a pipe method to be able to use JSX operators on it
    Then we use map (JSX operator) to access the response
    JSX operators are the way to access observables
    */

    return this.http.post(this.baseUrl + 'login', model, {headers : header}).pipe
    (
      map((response: any) => 
      {
        const resp = response;
        if(resp)
        {
          localStorage.setItem('token', resp.token);
        }
      })
    );
  }

  register(model: any)
  {
    // This is optional to know how to change content-type
    //==========================================================
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    //==========================================================

    return this.http.post(this.baseUrl + "register", model, {headers : header});
  }
}
