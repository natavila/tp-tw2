import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-verificacion',
	templateUrl: './verificacion.component.html',
	styleUrls: ['./verificacion.component.css'],
	providers: [RegistroService]
})

export class VerificacionComponent implements OnInit {

	token = this._route.snapshot.paramMap.get('token');

	constructor(private registroService: RegistroService,
		private _route: ActivatedRoute,
		private route: Router,
		private toastr: ToastrService) {
	}

	ngOnInit(): void {
		this.verificarUsuario();
	}

	verificarUsuario() {
		this.registroService.verificarUsuario(this.token).subscribe(
			data => {
				this.route.navigate(['/login']);
				this.toastr.success("La cuenta fue verificada exitosamente", "Verificacion exitosa");
			},
			error => {
				console.log(error);
				this.route.navigate(['/login']);
				this.toastr.error("Error al verificar cuenta", "Verificacion fallida");
			}
		)

	}

}
