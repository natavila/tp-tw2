export class Usuarios {

    constructor(_id: string, nombre: string, apellido: string, email: string, contraseña: string, direccion: string, edad: Number, preferencias: Array<String>, puntos: Number){
 
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.edad = edad;
        this. preferencias = preferencias;
        this.puntos = puntos;

    }

    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    direccion: string;
    edad: Number;
    preferencias: Array<String>;
    puntos: Number;

}
