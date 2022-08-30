export class User {
    constructor(
        public tiempo: number,
        public mesa: number,
        public pedidoComida: [string],
        public pedidoBebida: [string],
        public estado: string,
        public precio: number
        
        
    ){}
}