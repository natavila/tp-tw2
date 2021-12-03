import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-carrito',
	templateUrl: './carrito.component.html',
	styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {

	carrito: Carrito;
	pedido: Pedido;
	isLogged;

	constructor(
		private carritoService: CarritoService,
		private loginService: LoginService,
		private router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.verCarrito();
		this.loggedIn();
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

	confirmarCompra() {
		this.carritoService.confirmarCompra(this.carrito.idUsuario).subscribe(
			data => {
				console.log(data);
				this.pedido = data;
				this.toastr.success("La compra se realizo con exito.", "Carrito confirmado");
				this.router.navigate(['/pedido']);
			},
			error => {
				console.log(error);
			}
		)
	}

	eliminarDelCarrito(id: string) {
		this.carritoService.eliminarDelCarrito(id).subscribe(
			data => {
				console.log("Videojuego eliminado");
				this.toastr.success("El videojuego fue eliminado del carrito.", "Videojuego eliminado");
				this.verCarrito();
			},
			error => {
				console.log(error);
			}
		)
	}

	logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}

	loggedIn() {
		this.isLogged = this.loginService.loggedIn();
	}

}
