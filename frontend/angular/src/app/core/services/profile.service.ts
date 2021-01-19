import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig, Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
    constructor (private apiService: ApiService) {}
    
    // //Querys
    //   // Aqui es donde viene para ejecutar la query
    //   query(): Observable<{discotecas: Discoteca[]}> {

    //     return this.apiService.discotecasGet('/discotecas/').pipe(map(data => {
    //       return data;
    //     }));
    //   }

      // Get data
      get() {
        return this.apiService.getProfile('/profile/user')
          .pipe(map(data => data));
      }


      update(data: Object){
        console.log("data en el profile service: ",data)
        return this.apiService.updateProfile('/profile/user', data)
          .pipe(map(data => data));
      }

    //   //Favorite
    //   favorite(id: number) {  //id: Observable<Discoteca>
    //     return this.apiService.discotecasGet('/discotecas/' + id + '/favorite')
    //       .pipe(map(data => data.discoteca));
    //   }

    //   createDiscoteca(data = []) {
    //     return this.apiService.discotecasPost('/discotecas', data)
    //       .pipe(map(data => data.discoteca));
    //   }


      
}