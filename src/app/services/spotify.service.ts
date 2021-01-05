import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {

   }
   getQuery(query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAsiCvobCecWNNazGsBPgxOP0_-eyq7--FoQtXYWU0eeo1mhyp9ypFPDR8npWzFVk5wkwbtYznFg3d_uKE'
    });

    return this.http.get(url, { headers })
   }

   getNewReleases(){
    return this.getQuery('browse/new-releases')
      .pipe( map( data => data['albums'].items ));
   }

   getArtistas(termino: string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      .pipe( map( data => data['artists'].items ));
   }

   getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
     // .pipe( map( data => data['artists'].items ));
   }

   getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=es`)
     .pipe( map( data => data['tracks'] ));
   }
}
