import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DiscotecasService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: DiscotecaListConfig): Observable<{discotecas: Discoteca[], discotecasCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/discotecas/' + ((config.type === 'feed') ? 'feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Discoteca> {
    return this.apiService.get('/discotecas/' + slug)
      .pipe(map(data => data.discoteca));
  }

  destroy(slug) {
    return this.apiService.delete('/discotecas/' + slug);
  }

  save(discoteca): Observable<Discoteca> {
    // If we're updating an existing discoteca
    if (discoteca.slug) {
      return this.apiService.put('/discotecas/' + discoteca.slug, {discoteca: discoteca})
        .pipe(map(data => data.discoteca));

    // Otherwise, create a new discoteca
    } else {
      return this.apiService.post('/discotecas/', {discoteca: discoteca})
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
