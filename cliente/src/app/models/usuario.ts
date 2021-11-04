export class Usuario{

    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    direccion: string;
    //fecha_nacimiento: Date;
    preferencias: string;


    constructor( nombre: string, apellido: string, email: string, contraseña: string, direccion: string, /*fecha_nacimiento: Date,*/ preferencias: string){

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña;
        this.direccion = direccion;
        //this.fecha_nacimiento = fecha_nacimiento;
        this.preferencias = preferencias;

    }

}