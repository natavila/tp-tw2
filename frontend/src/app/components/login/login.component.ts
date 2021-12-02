import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [LoginService]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	usuario: Usuario;

	constructor(
		private loginService: LoginService,
		private fb: FormBuilder,
		private router: Router,
		private toastr: ToastrService
	) {

		this.loginForm = this.fb.group({
			email: ['', Validators.required, Validators.email],
			contrasena: ['', Validators.required],

		});
	}

	ngOnInit(): void {
	}

	logearUsuario() {
		const USUARIO: Usuario = {
			nombre: '',
			apellido: '',
			email: this.loginForm.get('email').value,
			contrasena: this.loginForm.get('contrasena').value,
			direccion: '',
		};
		this.loginService.logearUsuario(USUARIO).subscribe(
			res => {
				console.log(res)
				localStorage.setItem('token', res.token);
				this.router.navigate(['/video-juego']);
			},
			err => {
				if (err.noVerificado) {
					this.toastr.error('Debe verificar la cuenta para poder loguearse', 'Campos sin completar');
				}else if (!this.loginForm.get('email').value || !this.loginForm.get('contrasena').value) {
					this.toastr.error('El email y la contrasena son requeridos para iniciar sesion', 'Campos sin completar');
				} else
					this.toastr.error('El correo o la contraseña son incorrectas', 'Correo o contraseña incorrecta');
				console.log(err)
			}
		)
	}

}
