import { Component, OnInit } from '@angular/core';
// importar servicio
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  loading: boolean;
  error: boolean;
  mensajeError: string;
  nuevasCanciones: any[] = [];
  constructor(private spotify: SpotifyService ){
    this.error = false;
    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( errorServicio ) => {
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
        // console.log(errorServicio.error.error.message);
      });
  }

}
