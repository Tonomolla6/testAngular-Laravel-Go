import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';
import { map } from 'rxjs/operators';
console.log("DISCOTECA SERVICE");

@Injectable()
export class DiscotecasService {
    constructor (private apiService: ApiService) {}
    
    //Querys
    
      // Aqui es donde viene para ejecutar la query
      query(): Observable<{discoteca: Discoteca[]}> {
        console.log("QUERY discoteca service");
        return this.apiService.get('/discotecas/' );
      }

      //Details
      get(id: Observable<Discoteca>) {
        return this.apiService.get('/discotecas/' + id)
          .pipe(map(data => data.discoteca));
      }



      
}