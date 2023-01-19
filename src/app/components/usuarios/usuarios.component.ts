import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { BurgerService } from 'src/app/services/burger.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public contTicket: Pedido[] = [];
  public contEat:any = [];
  public contDrink:any = [];

  constructor(private _burgerService: BurgerService) { }

  ngOnInit(): void {
    this.getPedido();
  }

  getPedido(){
    this._burgerService.getTicket('golden').subscribe((r:any)=>{
      this.contTicket = r.pedidos;
      // console.log(this.contTicket);
      // this.splitOrder(this.contTicket);
      this.filterOrder(this.contTicket);

    })
  }

  // filterOrder(contTicket: any){
  //   let order = contTicket
  //   // console.log(order);
  //   for (let data of order){
  //     // console.log(data);
  //     console.log(data.pedidoComida.lenght);
  //     if (data.pedidoComida.lenght == 0) {
  //       console.log('false')
  //     }
  //     // for (let bebida of data.pedidoBebida) {
  //     //   console.log(bebida);
  //     //   if (!bebida.pedidoBebida) {
  //     //     console.log('ifOn');
  //     //   }
  //     // }
      
  //   }
  // }

  filterOrder(contTicket: any){
    let order = contTicket
    // console.log(order);
    let valorBuscado = 1
    console.log(valorBuscado);
    for (let p = 0; p < order.length; p++) {
      for (const key in order[p]) {
        if (key === "mesa") {
          if (order[p][key] === valorBuscado){
          }
        }else{

        }       
      }
      
    }
  }
  
  splitOrder(order: any){
    let tempOrder = order.pedidos;
    console.log(tempOrder);
    var eat = [];
    var drink = [];
    for (let data of tempOrder) {
      for (let bebida of data.pedidoBebida){
        drink.push(bebida);
      }
      for (let comida of data.pedidoComida){
        eat.push(comida);
      }
    }
    // console.log(drink);
    // console.log(eat);
  }


}
