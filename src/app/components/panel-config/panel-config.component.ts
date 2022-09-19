import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';


import { Plato } from 'src/app/models/plato.model';
import { BurgerService } from 'src/app/services/burger.service';
import Swal from 'sweetalert2';


declare var $:any;

@Component({
  selector: 'app-panel-config',
  templateUrl: './panel-config.component.html',
  styleUrls: ['./panel-config.component.css']
})
export class PanelConfigComponent implements OnInit {

   
  public formCategory: FormGroup;
  public formPlato: FormGroup;
  public allCategorys: any;
  public platosPerCategory: any;

  
  
  constructor(public _burgerService: BurgerService, public fb: FormBuilder) {

    this.formCategory = new FormGroup({
     name: new FormControl( '', [Validators.required, Validators.minLength(3)]),
     type: new FormControl('')
    }), 
    
    this.formPlato = new FormGroup({
      name: new FormControl( '', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', Validators.required),
      numberPerson: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
     })
  }



  ngOnInit(): void {
    this.getCategorys();
    this.getAllPlatos();
  }



  sendPlato(categoryForm: any){
    var plato = { 
         precio: this.formPlato.value.precio,
         description: this.formPlato.value.description,
         image: 'imagen',
         name: this.formPlato.value.name,
         numberPerson: this.formPlato.value.numberPerson, //cantidad de personas que comen
         category: categoryForm,
         establishment: 'golden' //Nombre complet 
        };
    console.log(plato)
    this._burgerService.registerPlato(plato).subscribe((res:any)=>{
      if(res){
        console.log('backend joya');
        this.formPlato.reset();
        this.getAllPlatos();
        this._burgerService.toastSuccess('Se agregó el plato');

      }
    },err =>{
      console.log(err);
    })
  }

   
  
  sendCategory(){
    var category = new Category(this.formCategory.value.name,'golden', this.formCategory.value.type);
    this._burgerService.registerCategory(category).subscribe((res:any)=>{
      if(res){ console.log('backend category joya');
      this.getCategorys(); 
      this.formCategory.reset();
      this._burgerService.toastSuccess('Se agrego la categoria!');
    }
    },err =>{
      console.log(err);
    });
  }



  getCategorys(){
    this._burgerService.getCategorys('golden').subscribe((res: any)=>{
      if(res){
        console.log(res);
        this.allCategorys = res;
         
        this.getAllPlatos();
      }
    });
  }

  getPlato(){
    this._burgerService.getPlatos('golden','bebidas').subscribe((res: any)=>{
      if(res){
        console.log('soy plato');
        this.platosPerCategory = res.platos;
        console.log(res);
            
      }
    });
  }

  getAllPlatos(){
    this._burgerService.getAllPlatos('golden').subscribe((res:any)=>{
      this.platosPerCategory = res.platos;

      console.log(res);

    });
  }

  showModalCategory(idCategory: string){
    $('#'+idCategory).modal('show');
  }

  platoDelete(idEliminar: string){
  this._burgerService.deletePlato(idEliminar).subscribe((res:any)=>{
    console.log(res);
    this.getAllPlatos(); 
    this._burgerService.toastSuccess('Se eliminó el plato.');
  });
  }

  categoryDelete(idEliminarCat: string){
    this._burgerService.toastWarningConfirm('Eliminar Categoria', "¿Está seguro que desea borrar la categoria?", 'Borrar');
    Swal.fire({
      title: 'Eliminar Categoria',
      text: "¿Está seguro que desea borrar la categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      background:'#242424',
      color: '#E87B13'
    }).then((result) => {
      if (result.value) {
      this._burgerService.deleteCategory(idEliminarCat).subscribe((res:any)=>{
      this.getCategorys();
      this._burgerService.toastSuccess('Se eliminó la categoria.');

    });
  }
  })}

}
