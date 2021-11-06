import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit(): void {
  }

}
