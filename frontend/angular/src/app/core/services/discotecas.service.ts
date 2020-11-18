import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';
import { map } from 'rxjs/operators';
console.log("Discoteca service");
@Injectable()
export class DiscotecasService {
  constructor (
    private apiService: ApiService
  ) {}

  

  // Aqui es donde viene para ejecutar la query
  query(config: DiscotecaListConfig): Observable<{discotecas: Discoteca[], discotecasCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    console.log("run query discoteca service");
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    console.log("xema");

    let prueba=this.apiService
    // .get(
    //   '/discoteca/' + ((config.type === '') ? 'feed' : ''), //Revisar lo de feed    discoteca, no discotecaS
    //   new HttpParams({ fromObject: params })
    // );
    .get(
      '/discoteca/',
      new HttpParams({ fromObject: params }),
      new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    );
    console.log("PRUEBA");
    console.log(  );
    return prueba;
  }

  get(slug): Observable<Discoteca> {
    return this.apiService.get('/discoteca/' + slug)
      .pipe(map(data => data.discoteca));
  }

  destroy(slug) {
    return this.apiService.delete('/discoteca/' + slug);
  }

  save(discoteca): Observable<Discoteca> {
    // If we're updating an existing discoteca
    if (discoteca.slug) {
      return this.apiService.put('/discoteca/' + discoteca.slug, {discoteca: discoteca})
        .pipe(map(data => data.discoteca));

    // Otherwise, create a new discoteca
    } else {
      return this.apiService.post('/discoteca/', {discoteca: discoteca})
        .pipe(map(data => data.discoteca));
    }
  }

  // favorite(slug): Observable<Discoteca> {
  //   return this.apiService.post('/discotecas/' + slug + '/favorite');
  // }

  // unfavorite(slug): Observable<Discoteca> {
  //   return this.apiService.delete('/discotecas/' + slug + '/favorite');
  // }


}
