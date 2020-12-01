import { Injectable } from '@angular/core';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Discoteca, DiscotecaListConfig } from '../models';

@Injectable()
export class DiscotecasService {
    constructor (
      private apiService: ApiService
    ) {}

    //Querys
      // Aqui es donde viene para ejecutar la query

}