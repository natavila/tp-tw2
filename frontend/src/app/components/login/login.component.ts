import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      contrasena: ['', Validators.required, Validators.minLength(8)],

    });
  }

  ngOnInit(): void {
  }

  logearUsuario() {
    const USUARIO: Usuario = {
      nombre: null,
      apellido: null,
      email: this.loginForm.get('email').value,
      contrasena: this.loginForm.get('contrasena').value,
      direccion: null,
      //fecha_nacimiento: this.registroForm.get('fecha_nacimiento')
      preferencias: null
    };

    this.loginService.logearUsuario(USUARIO).subscribe(
      res =>{
        console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/video-juego']);
      },
      err=> {
        console.log(err)
      }
    )
  }

}
