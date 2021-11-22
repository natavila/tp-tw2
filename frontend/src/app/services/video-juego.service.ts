import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VideoJuegoService {

  url = 'http://localhost:3000/video-juego';

  constructor(private http: HttpClient) {
  }

  obtenerVideoJuegos(): Observable<any>{
    return this.http.get(this.url);
  }
}
