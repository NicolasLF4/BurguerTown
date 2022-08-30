
export class Local {
	constructor(
		public name: String, //Nombre abreviado
        public direction: String,
        public lastPayment: Number,
        public suspend: Boolean,
        public namePerson: String,
        public phone: String,
        public numeroMesas: Number,
        public establishment: String //Nombre completo

	){}
}