import { Component, OnInit, Type } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { Pedido } from 'src/app/models/pedido.model';
import { BurgerService } from 'src/app/services/burger.service';
import * as moment from 'moment';

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
  public stepMenuN: Number = 1;
  public categoryNow: String = '';
  public contOrder:any = [];
  public totalPrice:number = 0;
  public orderEat:any = [];
  public orderDrink:any = [];

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
        this.categoryNow = selection;
        this.stepMenuN = 2;
        console.log(this.stepMenuN);
        this.makeItemMenu(r.platos,selection);
      }
    })
  }

  makeItemMenu(item: any, categoria:String){
    // Set variable default
    this.contMenu = [];
    var cache = []; 
    var storageValue = JSON.parse(localStorage.getItem('data'+this.categoryNow) || '[]');

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
    var storageValue:any = JSON.parse(localStorage.getItem('data'+this.categoryNow)||'')  ||[];
    console.log(storageValue)

    if (storageValue.length > 0) {
      var cacheMenu = []; 
      for (let i = 0; i < storageValue.length; i++) {
        if(categoria == storageValue.category){
            cacheMenu.push(storageValue);
            console.log(cacheMenu);
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
    if(!localStorage.getItem('data'+this.categoryNow)){
      localStorage.removeItem('data'+this.categoryNow);
      localStorage.setItem('data'+this.categoryNow, JSON.stringify(contMenuTemp));
    }else{
      localStorage.setItem('data'+this.categoryNow, JSON.stringify(contMenuTemp));
    }
  }

  evaluateOrder(){
    this._burgerService.getCategorys('golden').subscribe(( r:any ) =>{
      let category = r;
      var tempPushEat= [];
      var tempPushDrink = [];
      var tempPush = [];
      for (let i = 0; i < category.length; i++) {
        if (localStorage.getItem('data'+category[i].name)) {
          if (category[i].type == 'eat') {
            tempPushEat.push(JSON.parse(localStorage.getItem('data'+category[i].name)||'')) 
          }else{
            tempPushDrink.push(JSON.parse(localStorage.getItem('data'+category[i].name)||''))
          }
          tempPush.push(JSON.parse(localStorage.getItem('data'+category[i].name)||''));
          
          // console.log(tempPush[i]);         
        }
      }
      this.calcTotalPrice(tempPush);

      this.orderEat = tempPushEat;
      this.orderDrink = tempPushDrink;
      this.createTicket(tempPushEat, tempPushDrink);

    })
  }

  calcTotalPrice(temp:any){
    // console.log(temp);
    var sum = 0;
      for (let j = 0; j < temp.length; j++) {
        for (let i = 0; i < temp[j].length; i++) {
        //  console.log(temp[j][i]);
        //  console.log(temp[j][i]);
         sum += temp[j][i].precio;
        //  console.log(sum);       
        }              
      }
    this.totalPrice = sum;
    console.log(this.totalPrice);
  }

  createTicket(eat:any, drink:any){
    const time = new Date();
    console.log(moment(time));
    var pedido = { 
      tiempo: time,
      mesa: 1,
      pedidoComida: eat,
      pedidoBebida: drink,
      estado: 'en espera', 
      precio: this.totalPrice,
      establishment: 'golden' //Nombre completo
      };
      this._burgerService.sendTicket(pedido).subscribe((res:any)=>{
        console.log('backend joya');
      },err =>{
      console.log(err);
    })
  }

  backMenu(){
    this.stepMenuN = 1;
  }

  finalOrder(){
    this.evaluateOrder();
    this.stepMenuN = 3;
  }

  drinkOrder(){
    this.stepMenuN = 2
  }

  eatOrder(){
    
  }

  
}
