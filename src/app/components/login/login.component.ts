import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';

// import Swal from 'sweetalert2';
// import { SystemService } from 'src/app/service/system.service';

declare var $: any;
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { mailAccess: '', password: '' }
  public errorLogin = false;


  constructor(
    private _auth: AuthService, 
    private _router: Router,
    ) { }

  ngOnInit() {
  
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(res => {
          if(res){
            localStorage.setItem('tokenBurger', res.token);
            // localStorage.setItem('idMappClased', res.user._id);
            // if(res.user.mailAccess == 'vmklucas@gmail.com'){
            //   this._router.navigate(['/panel']);
            // }else if(res.user.admin){
            //   this._router.navigate(['/congregacion']);
            // }
            // else if(res.user.lider){
            //   this._router.navigate(['/lider']);
            // }
            // else if(res.user.contador){
              this._router.navigate(['/dashboard/funciones']);
            }else{
              alert("Error al logear");
            }
        },
        err => {
          console.log(err);
        }
      )
  }
}
