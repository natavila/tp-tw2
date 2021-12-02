import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [PedidoService]
})
export class PedidoComponent implements OnInit {

  pedido: Pedido;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.verPedido();
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

}
