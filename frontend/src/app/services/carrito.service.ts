import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CarritoService {

	url = 'http://localhost:3000/carrito/';

	constructor(
		private httpClient: HttpClient,

	) { }

	verCarrito(): Observable<any> {
		return this.httpClient.get(this.url);
	}

	agregarAlCarrito(id: string): Observable<any> {
		return this.httpClient.post(`${this.url}agregar-al-carrito`, { idVideoJuego: id });
	}
}
