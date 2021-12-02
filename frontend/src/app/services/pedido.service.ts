import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PedidoService {

	url = 'http://localhost:3000/pedido';

	constructor(
		private httpClient: HttpClient,

	) { }

	verPedido(): Observable<any> {
		return this.httpClient.get(this.url);
	}

}
