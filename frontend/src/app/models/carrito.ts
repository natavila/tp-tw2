export class Carrito {

    idUsuario: string;
    listaDeJuegos: [];


    constructor(idUsuario: string, listaDeJuegos: []) {

        this.idUsuario = idUsuario;
        this.listaDeJuegos = listaDeJuegos;

    }

}