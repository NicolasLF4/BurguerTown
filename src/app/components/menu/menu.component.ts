import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { BurgerService } from 'src/app/services/burger.service';

@Component({
  selector: 'app-home',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public typeView: String;
  public contCategorys: Category[] = [];

  constructor(private _burgerService: BurgerService) {
    this.typeView = 'eat';
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
      console.log(r);
    })
  }


}
