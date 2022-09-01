import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Global } from './services/global';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _registerUrl = Global.url + "/register";
  public _loginUrl = Global.url + "/login";

  
  constructor(public http: HttpClient,
              public _router: Router) { }

  registerUser(user: User) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: any) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._loginUrl, params, {headers: headers}).pipe(tap(
      (res) => {
        if (res) {
          //guardar Token
          console.log("Logeado");
          console.log(res);
        }
      }
    ))
  }

  loggedIn() {
    return !!localStorage.getItem('tokenBurger')
  }

  logoutUser(){
    localStorage.removeItem('tokenBurger')
    // localStorage.removeItem('idMappClased')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('tokenBurger')
  }


}
