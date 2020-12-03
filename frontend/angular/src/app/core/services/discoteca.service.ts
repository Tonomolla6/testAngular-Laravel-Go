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
    // console.log("");
      // Aqui es donde viene para ejecutar la query
      query(): Observable<{discoteca: Discoteca[]}> {
        return this.apiService.get('/discotecas/' );
      }



      
}