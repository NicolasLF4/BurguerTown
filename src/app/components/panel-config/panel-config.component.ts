import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';


import { Plato } from 'src/app/models/plato.model';
import { BurgerService } from 'src/app/services/burger.service';


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
     name: new FormControl( '', [Validators.required, Validators.minLength(3)])
    }), 
    this.formPlato = new FormGroup({
      name: new FormControl( '', [Validators.required, Validators.minLength(3)]
      ),
      precio: new FormControl('', Validators.required)
     })
  }



  ngOnInit(): void {
    this.getCategorys();
    this.getAllPlatos();
  }



  sendPlato(categoryForm: any){
    var plato = { 
         precio: this.formPlato.value.precio,
         description: 'description',
         image: 'imagen',
         name: this.formPlato.value.name,
         numberPerson: '112727384', //cantidad de personas que comen
         category: categoryForm,
         establishment: 'golden' //Nombre complet 
        };
        console.log(plato)
    this._burgerService.registerPlato(plato).subscribe((res:any)=>{
      if(res){
        console.log('backend joya');
        this.formPlato.reset();
        this.getAllPlatos();

      }
    },err =>{
      console.log(err);
    })
  }

   
  
  sendCategory(){
    var category = {
      establishment:'golden',
      name: this.formCategory.value.name
    };
    this._burgerService.registerCategory(category).subscribe((res:any)=>{
      if(res){ console.log('backend category joya');
      this.getCategorys(); 
      this.formCategory.reset();
    }
    },err =>{
      console.log(err);
    })
  }



  getCategorys(){
    this._burgerService.getCategorys('golden').subscribe((res: any)=>{
      if(res){
        this.allCategorys = res.categorys;
        console.log(this.allCategorys);
         
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
    })
  }

  getAllPlatos(){
    this._burgerService.getAllPlatos('golden').subscribe((res:any)=>{
      this.platosPerCategory = res.platos;

      console.log(res);

    })
  }

  showModalCategory(idCategory: string){
    $('#'+idCategory).modal('show');
  }

}
