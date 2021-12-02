import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VideoJuegoComponent } from './components/video-juego/video-juego.component';
import { VideoJuegoDetalleComponent } from './components/video-juego-detalle/video-juego-detalle.component';

import { LoginGuard } from './services/login.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: 'video-juego', component: VideoJuegoComponent },
	{ path: 'video-juego/:id', component: VideoJuegoDetalleComponent, canActivate: [LoginGuard] },
	{ path: 'carrito', component: CarritoComponent, canActivate: [LoginGuard] },
	{ path: 'pedido', component: PedidoComponent, canActivate: [LoginGuard] },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' } //Cuando se ingresa una url que no existe lo redirecciona al login
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],

	exports: [RouterModule]
})

export class AppRoutingModule {}
