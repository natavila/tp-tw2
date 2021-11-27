export class Usuario {

    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    direccion: string;

    constructor(nombre: string, apellido: string, email: string, contrasena: string, direccion: string) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasena = contrasena;
        this.direccion = direccion;

    }

}