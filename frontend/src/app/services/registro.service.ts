import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { 
    this.http.get(this.url);
  }

  registrarUsuario(usuario: Usuario): Observable<any>{ //Devuelve un observable
    return this.http.post(this.url, usuario);
  }

}
