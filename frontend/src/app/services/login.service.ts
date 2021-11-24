import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})

export class LoginService {

	url = 'http://localhost:3000/usuario/';

	constructor(
		private http: HttpClient,
		private router: Router
	) {}

	logearUsuario(usuario: Usuario): Observable<any> {
		return this.http.post(`${this.url}login`, usuario);
	}

	loggedIn() {
		return !!localStorage.getItem('token');
	}

	getToken() {
		return localStorage.getItem('token');
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}
}
