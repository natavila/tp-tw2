import { Component, OnInit } from '@angular/core';
import { VideoJuegoService } from 'src/app/services/video-juego.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/models/carrito';
import { VideoJuego } from 'src/app/models/video-juego';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-video-juego-detalle',
	templateUrl: './video-juego-detalle.component.html',
	styleUrls: ['./video-juego-detalle.component.css'],
	providers: [VideoJuegoService, CarritoService]
})
export class VideoJuegoDetalleComponent implements OnInit {

	videoJuego: VideoJuego;
	carrito: Carrito;
	id = this._route.snapshot.paramMap.get('id');

	constructor(private videoJuegoService: VideoJuegoService,
		private carritoService: CarritoService,
		private _route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService) {

	}

	ngOnInit(): void {
		this.verDetalleVideojuego();

	}

	verDetalleVideojuego() {

		console.log(this.id);
		this.videoJuegoService.verVideoJuego(this.id).subscribe(
			data => {
				console.log(data);
				this.videoJuego = data;
			},
			error => {
				console.log(error);
			}
		)
	}

	agregarAlCarrito() {
		this.carritoService.agregarAlCarrito(this.id).subscribe(
			data => {
				this.carrito = data;
				this.toastr.success(this.videoJuego.nombre + " ha sido añadido al carrito.");
				this.router.navigate(['/video-juego']);
			},
			error => {
				alert("El video juego ya existe en el carrito");
				this.router.navigate(['/video-juego']);
				console.log(error);
			}
		)
	}

}
