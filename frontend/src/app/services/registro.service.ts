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

	verificarUsuario(token: string): Observable<any> {
		return this.http.get(`${this.url}verificacion/${token}`);
	}
}
