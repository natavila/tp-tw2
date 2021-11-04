import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Usuarios } from './usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  selectedUsuarios = Usuarios;
  usuarios: Usuarios[];
  constructor(usuarios: Usuarios[]) { 
    this.usuarios = usuarios;
  }
}
