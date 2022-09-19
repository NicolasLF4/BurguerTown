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
    // Set variable default
    this.contMenu = [];
    var cache = []; 
    var storageValue = JSON.parse(localStorage.getItem('data'+this.typeView) || '[]');

    if (storageValue.length > 0) {
      cache = this.setCachePlato(storageValue,categoria);
      this.setMenuWhitCache(item, cache)
    }else{
      for (let i = 0; i < item.length; i++){            
        let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category,0);
        this.contMenu.push(contItemTemp);
      }
    }
  }

  setMenuWhitCache(item:any, cache: any){
    for (let i = 0; i < item.length; i++) {
      var concidio = false;
      for (let j = 0; j < cache.length; j++) {
        if(item[i].name == cache[j].name){
          let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category, cache[j].cant);
          this.contMenu.push(contItemTemp);
          concidio = true;
          continue;
        }  
      }
      if(!concidio){
        let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category, 0);
        this.contMenu.push(contItemTemp);
      }
    }
  }

  setCachePlato(storageValue:any, categoria:any){
    let temp = [];
    for (let i = 0; i < storageValue.length; i++) {
      if(categoria == storageValue[i].category){
          temp.push(storageValue[i]);
      }
    }
    return temp;
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
    this.evaluateQuantity();
  }

  deletePlato(itemMenu:any){
    itemMenu.cant -= 1;
    this.evaluateQuantity();
  }

  toggleTypeFood(){
    this.evaluateQuantity();
    if (this.typeView == 'eat'){this.typeView = 'drink';}else{this.typeView = 'eat';}
    this.stepMenu = false;
    this.getCategorys(this.typeView);
  }

  evaluateQuantity(){
    var contMenuTemp = [];
    for (let i = 0; i < this.contMenu.length; i++) {
      if (this.contMenu[i].cant > 0) {
        console.log(this.contMenu[i]);
        contMenuTemp.push(this.contMenu[i]);
      }   
    }
    if(!localStorage.getItem('data'+this.typeView)){
      localStorage.removeItem('data'+this.typeView);
      localStorage.setItem('data'+this.typeView, JSON.stringify(contMenuTemp));
    }else{
      localStorage.setItem('data'+this.typeView, JSON.stringify(contMenuTemp));
    }
  }
  
}
