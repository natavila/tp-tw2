import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJuegoDetalleComponent } from './video-juego-detalle.component';

describe('VideoJuegoDetalleComponent', () => {
  let component: VideoJuegoDetalleComponent;
  let fixture: ComponentFixture<VideoJuegoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoJuegoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJuegoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
