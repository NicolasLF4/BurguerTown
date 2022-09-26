export class Pedido {
    constructor(
        public tiempo: Date,
        public mesa: Number,
        public pedidoComida: [String],
        public pedidoBebida: [String],
        public estado: String,
        public precio: Number,
        public establishment: String //Nombre completo
    ){}
}