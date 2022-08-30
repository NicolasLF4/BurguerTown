import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Global } from './service/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  public _registerUrl = Global.url + "/register";
  public _loginUrl = Global.url + "/login";
  // public _registerUrl = "http://localhost:3900/api/register";
  // public _loginUrl = "http://localhost:3900/api/login";

  
  constructor(public http: HttpClient,
              public _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._loginUrl, params, {headers: headers}).pipe(tap(
      (res) => {
        if (res) {
          //guardar Token
          
        }
      }
    ))
  }

  loggedIn() {
    return !!localStorage.getItem('tokenMappClased')
  }

  logoutUser(){
    localStorage.removeItem('tokenMappClased')
    localStorage.removeItem('idMappClased')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('tokenMappClased')
  }


}
