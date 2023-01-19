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
  public buttonOrder: String;
  public colorEat:string;
  public colorDrink:string;
  public colorFinalOrder:string;
  public orderButton:string;
  public btnDrinkFood:string;



  constructor(private _burgerService: BurgerService) {
    this.typeView = 'eat'; // drink
    this.buttonOrder = 'Siguiente'; // finalizar
    this.colorEat = 'colorOn';
    this.colorDrink = 'colorOff';
    this.colorFinalOrder = 'colorOff';
    this.orderButton = 'col-12';
    this.btnDrinkFood = 'Ir a las bebidas';

  }

  ngOnInit(): void {
    this.getCategorys(this.typeView);
    this.evaluateOrder();
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
        this.positionOrder(this.stepMenuN);
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
    this.evaluateOrder();
  }

  deletePlato(itemMenu:any){
    itemMenu.cant -= 1;
    this.evaluateQuantity();
    this.evaluateOrder();
  }

  toggleTypeFood(){
    // this.colorIcon();
    this.evaluateQuantity();
    if (this.typeView == 'eat'){this.typeView = 'drink';}else{this.finalOrder();}
    this.stepMenu = false;
    this.colorIcon();
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
      this.orderEat = this.cleanPush(tempPushEat);
      this.orderDrink = this.cleanPush(tempPushDrink);
      console.log(this.orderEat);
      
      // console.log(tempPushEat);
      // this.orderEat = tempPushEat;
      // this.orderDrink = tempPushDrink;
      this.createTicket(this.orderEat, this.orderDrink);

    })
  }

  calcTotalPrice(temp:any){
    // console.log(temp);
    var mult = 0;

      for (let j = 0; j < temp.length; j++) {
        for (let i = 0; i < temp[j].length; i++) {
          mult += temp[j][i].precio * temp[j][i].cant;
        }              
      }
      console.log(mult);
    this.totalPrice = mult;
    console.log(this.totalPrice);
  }

  cleanPush(pedido:any){
   let  tempPedido = pedido;
   var cleanPush = [];
   for (let i = 0; i < tempPedido.length; i++) {
    for (let j = 0; j < tempPedido[i].length; j++) {
      cleanPush.push(tempPedido[i][j]);
    }}
    return cleanPush
  }

  createTicket(eat:any, drink:any){
    const time = new Date();
    console.log(moment(time));
    console.log(eat);
    var pedido = { 
      'tiempo': time,
      'mesa': 6,
      'pedidoComida': eat,
      'pedidoBebida': drink,
      'estado': 'en espera', 
      'precio': this.totalPrice,
      'establishment': 'golden' //Nombre completo
      };
      console.log(pedido);
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
    this.typeView = 'finalOrder';
    this.buttonFinaly(this.typeView);
    this.stepMenuN = 3;
  }

  buttonFinaly(type: any){
    if(type == 'finalOrder'){
      this.buttonOrder = 'Finalizar Pedido'
    }
  }

  colorIcon(){
    if (this.typeView == 'eat'){
      this.colorEat = 'colorOn';
      this.colorDrink = 'colorOff';
    } else if (this.typeView == 'drink'){
      this.colorEat = 'colorOn';
      this.colorDrink = 'colorOn';
    } else if (this.typeView == 'finalOrder'){
      this.colorEat = 'colorOn';
      this.colorDrink = 'colorOn';
      this.colorFinalOrder = 'colorOn';
    }else{
      this.colorEat = 'colorOn';
    }
  }

  positionOrder(stepMenuN: any){
    var value = stepMenuN
    console.log(value)
    if (value == 2){
      this.orderButton = 'col-6';
      console.log(this.orderButton)
    } else {
      this.orderButton = 'col-12';
    }
  }

  skipFood(){
    this.evaluateQuantity();
    if (this.typeView == 'eat'){
      this.typeView = 'drink';
      this.btnDrinkFood = 'Ir a las comidas'
    } else {
      this.typeView = 'eat'
    }
    this.colorIcon();
    this.stepMenu = false;
    this.getCategorys(this.typeView);
  }

  
}
