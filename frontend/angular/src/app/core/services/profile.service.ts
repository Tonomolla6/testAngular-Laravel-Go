import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig, Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
    constructor (private apiService: ApiService) {}
      // Get data
      get() {
        return this.apiService.getProfile('/profile/user')
          .pipe(map(data => data));
      }

      update(data: Object){
        return this.apiService.updateProfile('/profile/user', data)
          .pipe(map(data => data));
      }
      
}