import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DiscotecasService {
    constructor (private apiService: ApiService) {}
    
    //Querys
      // Aqui es donde viene para ejecutar la query
      query(): Observable<{discotecas: Discoteca[]}> {

        return this.apiService.get('/discotecas/').pipe(map(data => {
          return data;
        }));
      }

      //Details
      get(id: Observable<Discoteca>) {
        return this.apiService.get('/discotecas/' + id)
          .pipe(map(data => data.discoteca));
      }



      
}