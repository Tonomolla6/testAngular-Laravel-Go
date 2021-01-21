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

        return this.apiService.discotecasGet('/discotecas/').pipe(map(data => {
          return data;
        }));
      }

      getDiscotecasByUser(id: number) {
        return this.apiService.discotecasGet('/discotecas/'+id+'/user').pipe(map(data => {
          return data;
        }));
      }

      //Details
      get(id: Observable<Discoteca>) {
        return this.apiService.discotecasGet('/discotecas/' + id)
          .pipe(map(data => data.discoteca));
      }

      //Favorite
      favorite(id: number) {  //id: Observable<Discoteca>
        console.log("dando faovrito a la id: ",id)
        return this.apiService.discotecasFavorite('/discotecas/' + id + '/favorite')
          .pipe(map(data => data.discoteca));
      }

      //UnFavorite
      unfavorite(id: number) {  //id: Observable<Discoteca>
        console.log("quitando faovrito a la id: ",id)
        return this.apiService.discotecasFavorite('/discotecas/' + id + '/unfavorite')
          .pipe(map(data => data.discoteca));
      }

      createDiscoteca(data: Discoteca) {
        console.log("creando discoteca, discoteca service")
        console.log(data)
        return this.apiService.discotecasPost('/discotecas', data)
          .pipe(map(data => data));
      }

}