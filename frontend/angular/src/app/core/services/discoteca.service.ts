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
      query(): Observable<{discotecas: Discoteca[]}> {
        console.log("QUERY discoteca service");
        // console.log("-------------------------------------------------")
        // let prueba=this.apiService.get('/discotecas/' );
        return this.apiService.get('/discotecas/').pipe(map(data => {
          return data;
        }));
        // console.log("PRUEBA");
        // console.log(prueba);
        // return prueba;
        // return this.apiService.get('/discotecas/' );
      }

      //Details
      get(id: Observable<Discoteca>) {
        console.log("DENTRO DEL GEEET");
        return this.apiService.get('/discotecas/' + id)
          .pipe(map(data => data.discoteca));
      }



      
}