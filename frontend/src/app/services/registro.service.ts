import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
	providedIn: 'root',
})

export class RegistroService {

	url = 'http://localhost:3000/usuario/';

	constructor(
		private http: HttpClient
	) {}

	registrarUsuario(usuario: Usuario): Observable<any> {
		return this.http.post(this.url, usuario);
	}
}
