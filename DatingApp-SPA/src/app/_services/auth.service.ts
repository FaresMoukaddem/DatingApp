import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';

  jwtHelper = new JwtHelperService();

  decodedToken: any;

  currentUser: User;

  photoUrl = new BehaviorSubject<string>('../../assets/user.png');

  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string)
  {
    this.photoUrl.next(photoUrl);
  }

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
        if (resp)
        {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));
          this.decodedToken = this.jwtHelper.decodeToken(resp.token);
          this.currentUser = resp.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User)
  {
    // This is optional to know how to change content-type
    //==========================================================
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    //==========================================================

    return this.http.post(this.baseUrl + 'register', user, {headers : header});
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
