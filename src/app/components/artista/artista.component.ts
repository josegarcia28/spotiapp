import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];
  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService ) {
    this.loading = true;
    this.router.params.subscribe( params => {
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'])
    });

  }

  getArtista( id: string ) {
    this.loading = true;
    this.spotify.getArtista( id )
      .subscribe( artista => {
        this.artista = artista;
        console.log(artista);
        this.loading = false;
      });
  }

  getTopTracks( id: string) {
    this.loading = true;
    this.spotify.getTopTracks( id )
      .subscribe( TopTracks => {
        this.topTracks = TopTracks;
        console.log(TopTracks);
      })
  }

}
