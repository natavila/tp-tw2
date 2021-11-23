import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { 
    this.http.get(this.url);
  }

  logearUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.url, usuario);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  
  getToken(){
    return localStorage.getItem('token');
  }
}
