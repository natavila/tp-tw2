import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Usuarios } from './usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  selectedUsuarios = Usuarios;
  usuarios: Usuarios[];
  constructor(usuarios: Array<Usuarios>) { 
    this.usuarios = usuarios;
  }
}
