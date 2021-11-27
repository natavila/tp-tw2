
export class VideoJuego {

	_id: string;
	nombre: string;
	descripcion: string;
	categoria: string;
	clasificacion: Number;
	precio: Number;
	puntos: Number;
	imagen: string;

	constructor(_id: string, nombre: string, descripcion: string, categoria: string, clasificacion: Number, precio: Number, puntos: Number, imagen: string) {

		this._id = _id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.clasificacion = clasificacion;
		this.precio = precio;
		this.puntos = puntos;
		this.imagen = imagen;

	}

}