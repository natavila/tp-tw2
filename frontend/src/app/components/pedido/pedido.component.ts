import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService]
})
export class PedidoComponent implements OnInit {

  pedido: Pedido;
  isLogged;

  constructor(private pedidoService: PedidoService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.verPedido();
    this.loggedIn();
  }

  verPedido() {
    this.pedidoService.verPedido().subscribe(
      data => {
        console.log(data)
        this.pedido = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  loggedIn() {
		this.isLogged = this.loginService.loggedIn();
	}

  logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}
}
