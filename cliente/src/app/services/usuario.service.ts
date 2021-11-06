import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { 
    this.http.get(this.url);
  }

  registrarUsuario(usuario: Usuario): Observable<any>{ //Devuelve un observable
    return this.http.post(this.url, usuario);
  }
}
