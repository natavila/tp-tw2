import { Component, OnInit } from '@angular/core';
import { VideoJuegoService } from 'src/app/services/video-juego.service';

@Component({
  selector: 'app-video-juego',
  templateUrl: './video-juego.component.html',
  styleUrls: ['./video-juego.component.css'],
  providers: [VideoJuegoService],
})

export class VideoJuegoComponent implements OnInit {

  videoJuegos = [];


  constructor(private videoJuegoService: VideoJuegoService) {
  }

  ngOnInit(): void {
    this.listarVideoJuegos();
  }

  listarVideoJuegos() {
    this.videoJuegoService.obtenerVideoJuegos().subscribe(
      (data) => {
        this.videoJuegos = data;
      },
      (error) => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      }
    );
  }
}
