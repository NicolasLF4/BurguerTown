export class ItemMenu {
    static cant: any;
    constructor(
        public precio: Number,
        public description: String,
        public image: String,
        public name: String,
        public numberPerson: String, //cantidad de personas que comen
        public category: String,
        public cant: Number 
    ){}
}