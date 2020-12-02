import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';
import { map } from 'rxjs/operators';
console.log("DISCOTECA SERVICE");
@Injectable()

export class DiscotecasService {
    constructor (
      private apiService: ApiService
    ) {}

    //Querys
      // Aqui es donde viene para ejecutar la query
      query(config: DiscotecaListConfig): Observable<{discotecas: Discoteca[], discotecasCount: number}> {
        // Convert any filters over to Angular's URLSearchParams
        console.log("hola");
        const params={};
        // var params: Map<string, any> = new Map<string, any>();
    
        Object.keys(config.filters).forEach((key) => {

          params[key] = config.filters[key];
        });
    
        return this.apiService.get(
          '/discotecas/' + ((config.type === 'feed') ? 'feed' : ''),
          new HttpParams({ fromObject: params })
        );
      }



      
}