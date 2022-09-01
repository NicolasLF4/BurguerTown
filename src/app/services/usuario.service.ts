import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Plato } from '../models/plato.model';
import { Global } from 'src/app/services/global';
import { Category } from '../models/category.model';
import { Local } from '../models/local.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
  export class BurgerService {
  
    // private url = 'http://142.44.210.59:3900/api/';
  
    private url = Global.url;

  
    constructor(private http: HttpClient, private user: User) { }
  

    registerPlato(plato: Plato) {
    let params = JSON.stringify(plato);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + "/registerPlato/", params, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  outUser(user: any){
    // if(user.admin){
    //     this._router.navigate(['/congregacion']);
    // }else if(user.lider){
    //     this._router.navigate(['/lider']);
    // }else if(user.tesorero){
    //     this._router.navigate(['/finanzas']);
    // }else if(user.contador){
    //     this._router.navigate(['/contador']);
    // }else{
    //     this._router.navigate(['/login']);
    // }
}

//   registerCategory(category: Category) {
//     let params = JSON.stringify(category);
//     let headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.post(this.url + "/registerCategory/", params, { headers: headers }).pipe(map(
//       resp => { return resp; }
//     ));
//   }

//   getCategorys(establishment: string ) {
//     let headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.get(this.url + "/getCategorys/" + establishment, { headers: headers }).pipe(map(
//       resp => { return resp; }
//     ));
//   }

//   getPlatos( establishment: string, category: string ) {
//     let headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.get(this.url + "/getPlatos/" + establishment + ',' + category , { headers: headers }).pipe(map(
//       resp => { return resp; }
//     ));
//   }


//   getAllPlatos(establishment: string){
//     let headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.get(this.url + "/getAllPlatos/" + establishment, { headers: headers }).pipe(map(
//       resp => { return resp; }
//     ));
//   }



}