import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Plato } from '../models/plato.model';
import { Global } from 'src/app/services/global';
import { Category } from '../models/category.model';
import { Local } from '../models/local.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
  export class BurgerService {
  
    // private url = 'http://142.44.210.59:3900/api/';
  
    private url = Global.url;

    // public plato: Plato;
    // public micelula: Usuario[];
  
    constructor(private http: HttpClient) { }
  

    registerPlato(plato: Plato) {
    let params = JSON.stringify(plato);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + "/registerPlato/", params, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }



  registerCategory(category: Category) {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + "/registerCategory/", params, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  getCategorys(establishment: String, type?: String ) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + "/getCategorys/" + establishment + ',' + type, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  getPlatos( establishment: String, category: String ) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + "/getPlatos/" + establishment + ',' + category , { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }


  getAllPlatos(establishment: String){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + "/getAllPlatos/" + establishment, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  deletePlato(id: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + "/deletePlato/" + id, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  deleteCategory(id: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + "/deleteCategory/" + id, { headers: headers }).pipe(map(
      resp => { return resp; }
    ));
  }

  toastSuccess(text: any){
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: text,
      background: '#E87B13',
      color: '#242424'
    });
  }

  toastWarningConfirm(text: string, warning: string, confirm: string){
    Swal.fire({
      title: text,
      text: warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirm,
      background: '#242424',
      color: '#E87B13'
    })
  }

  saveStorage(){
    localStorage.setItem('','');
  }


}