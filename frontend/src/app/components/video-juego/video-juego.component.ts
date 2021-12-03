import { Component, Input, OnInit } from '@angular/core';
import { VideoJuegoService } from 'src/app/services/video-juego.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-video-juego',
	templateUrl: './video-juego.component.html',
	styleUrls: ['./video-juego.component.css'],
	providers: [VideoJuegoService]
})

export class VideoJuegoComponent implements OnInit {

	videoJuegos = [];
	isLogged;

	constructor(
		private videoJuegoService: VideoJuegoService,
		private loginService: LoginService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.listarVideoJuegos();
		this.loggedIn();
	}

	listarVideoJuegos() {
		this.videoJuegoService.obtenerVideoJuegos().subscribe(
			(data) => {
				this.videoJuegos = data;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}

	loggedIn() {
		this.isLogged = this.loginService.loggedIn();
	}
}
