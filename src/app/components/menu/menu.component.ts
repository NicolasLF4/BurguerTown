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
        this.makeItemMenu(r.platos);
      }
    })
  }

  makeItemMenu(item: any){
    this.contMenu = [];
    // console.log(item);
    for (let i = 0; i < item.length; i++) {
      let contItemTemp = new ItemMenu(item[i].precio, item[i].description, item[i].image, item[i].name, item[i].numberPerson, item[i].category, 0);
      this.contMenu.push(contItemTemp);
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
    // funcion de checkear cuales comidas con > 1 
    if (this.typeView == 'eat'){this.typeView = 'drink';}else{this.typeView = 'eat';}
    this.stepMenu = false;
    this.getCategorys(this.typeView);
  }
}
