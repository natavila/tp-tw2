import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css'],
	providers: [RegistroService]
})
export class RegistroComponent implements OnInit {
	registroForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private toastr: ToastrService,
		private registroService: RegistroService
	) {
		//Inyeccion de servicios
		this.registroForm = this.fb.group({
			email: ['', Validators.required, Validators.email],
			contrasena: ['', Validators.required, Validators.minLength(8)],
			nombre: ['', Validators.required, Validators.nullValidator],
			apellido: ['', Validators.required, Validators.nullValidator],
			direccion: ['', Validators.required, Validators.minLength(8)],
			fecha_nacimiento: ['', Validators.required, Validators.nullValidator],
		});
	}

	ngOnInit(): void { }

	registrarUsuario() {
		const USUARIO: Usuario = {
			nombre: this.registroForm.get('nombre').value,
			apellido: this.registroForm.get('apellido').value,
			email: this.registroForm.get('email').value,
			contrasena: this.registroForm.get('contrasena').value,
			direccion: this.registroForm.get('direccion').value,
		};

		this.registroService.registrarUsuario(USUARIO).subscribe(
			res => {
				console.log(res);
				localStorage.setItem('token', res.token);
				this.toastr.success('El registro fue exitoso!', 'Usuario registrado');
				this.router.navigate(['/login']);
			},

			(error) => {
				console.log('Error al registrar usuario', error);

				if (USUARIO.nombre == '' || USUARIO.apellido == '' || USUARIO.email == '' || USUARIO.contrasena == '' || USUARIO.direccion == '') {
					this.toastr.error("Complete los campos faltantes", 'Campos faltantes');
					return;
				}
				if (!this.validarEmail()) {
					this.toastr.error("El correo electronico proporcionado es invalido", 'Correo electronico invalido');
					return;
				}
				if (!this.validarContrasena()) {
					this.toastr.error("La contraseña debe contener mínimo ocho caracteres, al menos una letra y un número", 'Contraseña insegura');
					return;
				}

				this.toastr.error("El correo electronico proporcionado ya se encuentra registrado", 'Correo electronico ya registrado');
				return;
			}
		);
	}

	validarContrasena() {
		return this.registroForm.get('contrasena').value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
	}

	validarEmail() {
		return this.registroForm.get('email').value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	}
}
