import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {
    //Inyeccion de servicios
    this.registroForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      contrasena: ['', Validators.required, Validators.minLength(8)],
      nombre: ['', Validators.required, Validators.nullValidator],
      apellido: ['', Validators.required, Validators.nullValidator],    
      direccion: ['', Validators.required, Validators.minLength(8)],
      fecha_nacimiento: ['', Validators.required, Validators.nullValidator],
      preferencias: ['', Validators.required, Validators.nullValidator],
    });
  }

  ngOnInit(): void {}

  registrarUsuario() {
    const USUARIO: Usuario = {
      nombre: this.registroForm.get('nombre').value,
      apellido: this.registroForm.get('apellido').value,
      email: this.registroForm.get('email').value,
      contrasena: this.registroForm.get('contrasena').value,
      direccion: this.registroForm.get('direccion').value,
      //fecha_nacimiento: this.registroForm.get('fecha_nacimiento')
      preferencias: this.registroForm.get('preferencias').value,
    };

    this.usuarioService.registrarUsuario(USUARIO).subscribe(
      (data) => {
        this.toastr.success('El registro fue exitoso!', 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('No se pudo registrar', error);
        this.registroForm.reset();
      }
    );
  }
}
