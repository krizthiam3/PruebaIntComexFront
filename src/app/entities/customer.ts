export class  Customer {

    constructor(
        public id: number = 0,
        public usuario: string = '',
        public nombreCompleto: string= '' ,
        public cargo: string= '',
        public email: string= '',
        public codTipoContacto: string= '',
    ) { }
}