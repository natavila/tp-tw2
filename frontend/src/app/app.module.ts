import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VideoJuegoComponent } from './components/video-juego/video-juego.component';
import { VideoJuegoDetalleComponent } from './components/video-juego-detalle/video-juego-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';

import { LoginGuard } from './services/login.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistroComponent,
		VideoJuegoComponent,
		VideoJuegoDetalleComponent,
  		CarritoComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		HttpClientModule,
		CommonModule
	],
	providers: [
		LoginGuard,
		{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptorService,
		multi: true,
		}
	],
	bootstrap: [AppComponent],
})

export class AppModule {}

