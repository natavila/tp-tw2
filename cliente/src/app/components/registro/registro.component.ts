import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { 
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      contraseña: ['', Validators.required, Validators.minLength(8)],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      preferencias: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  registrarUsuario(){
  
    const USUARIO: Usuario = {
      nombre: this.registroForm.get('nombre').value,
      apellido: this.registroForm.get('apellido').value,
      email: this.registroForm.get('email').value,
      contraseña: this.registroForm.get('contraseña').value,
      direccion: this.registroForm.get('direccion').value,
      //fecha_nacimiento: this.registroForm.get('fecha_nacimiento')
      preferencias: this.registroForm.get('preferencias').value
    }

      this.toastr.success('El registro fue exitoso!', 'Usuario registrado');
      this.router.navigate(['/login']);
  }

}
