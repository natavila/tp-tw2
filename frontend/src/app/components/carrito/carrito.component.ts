import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
	selector: 'app-carrito',
	templateUrl: './carrito.component.html',
	styleUrls: ['./carrito.component.css'],
	providers: [CarritoService]
})
export class CarritoComponent implements OnInit {

	carrito: Carrito;

	constructor(
		private carritoService: CarritoService,
		private router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.verCarrito();
	}

	verCarrito() {
		this.carritoService.verCarrito().subscribe(
			data => {
				console.log(data);
				this.carrito = data;
			},
			error => {
				console.log(error);
			}
		)
	}

	agregarAlCarrito() {
		let id = this._route.snapshot.paramMap.get('id');
		this.carritoService.agregarAlCarrito(id).subscribe(
			data => {
				console.log("Se agrergo el juego", id);
			},
			error => {
				console.log(error);
			}
		)
	}
}
