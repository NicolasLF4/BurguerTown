import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { BurgerService } from 'src/app/services/burger.service';

@Component({
  selector: 'app-home',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public typeView: String;
  public contCategorys: Category[] = [];
  public contMenu: ItemMenu[] = [];
  public stepMenu: Boolean = false; // Arrancan mostrando las categorias
  public cache:any;

  constructor(private _burgerService: BurgerService) {
    this.typeView = 'eat'; // drink
  }

  ngOnInit(): void {
    this.getCategorys(this.typeView);
  }

  getCategorys(type: String){
    this._burgerService.getCategorys('golden', type).subscribe(( r:any ) => {
      this.contCategorys = r;
      console.log(this.contCategorys);
    })
  }

  selectionCategory(selection: String){
    this._burgerService.getPlatos('golden', selection.toLowerCase()).subscribe(( r:any ) => {
      if(r){
        this.stepMenu = true;
        this.makeItemMenu(r.platos,selection);
      }
    })
  }

  makeItemMenu(item: any, categoria:String){
    this.contMenu = [];
     this.cache = []; 

    var storageValue:any = JSON.parse(localStorage.getItem('data'+this.typeView)||'')  ||[];
    console.log(storageValue)
    if (storageValue.length > 0) {
      for (let i = 0; i < storageValue.length; i++) {
        console.log(categoria);
        if(categoria == storageValue[i].category){
            this.cache.push(storageValue);
            console.log(this.cache);
        }
      }
      for (let i = 0; i < item.length; i++) {
        console.log('for 1');
        console.log(this.cache);
        for (let j = 0; j < this.cache.length; j++) {
          console.log('for 2')
          console.log(item[i].name);
          console.log(this.cache);

          if(item[i].name == this.cache[j].name){
            let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category, this.cache[j].cant);
            this.contMenu.push(contItemTemp);
            console.log('1');
            continue          
          }  
        }
        let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category, 0);
        this.contMenu.push(contItemTemp);
      }
      
    }else{
      for (let i = 0; i < item.length; i++){            
        let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category,0);
        this.contMenu.push(contItemTemp);
      }
    }
    // console.log(item);    
  }

  checkStorage(categoria:any):any{
    var storageValue:any = JSON.parse(localStorage.getItem('data'+this.typeView)||'')  ||[];
    console.log(storageValue)

    if (storageValue.length > 0) {
      var cacheMenu = []; 
      for (let i = 0; i < storageValue.length; i++) {
        if(categoria == storageValue.category){
            cacheMenu.push(storageValue);
        }
      }
      return cacheMenu;
    }
  }

  addPlato(itemMenu:any){
    itemMenu.cant += 1;
    console.log(this.contMenu);

  }

  deletePlato(itemMenu:any){
    itemMenu.cant -= 1;
  }

  toggleTypeFood(){
    this.evaluateQuantity();
    if (this.typeView == 'eat'){this.typeView = 'drink';}else{this.typeView = 'eat';}
    this.stepMenu = false;
    this.getCategorys(this.typeView);
  }

  evaluateQuantity(){
    console.log(this.contMenu);
    var contMenuTemp = [];
    for (let i = 0; i < this.contMenu.length; i++) {
      if (this.contMenu[i].cant > 0) {
        console.log(this.contMenu[i]);
        contMenuTemp.push(this.contMenu[i]);
      }   
    }
    localStorage.setItem('data'+this.typeView, JSON.stringify(contMenuTemp));

  }
  
}
