import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable ,  throwError } from 'rxjs';

import { JwtService } from './jwt.service'; 
import { catchError } from 'rxjs/operators';
@Injectable()

export class ApiService {
    constructor(
        private http: HttpClient
      ) {}

      private formatErrors(error: any) {
        return  throwError(error.error);
      }

      // ENDPOINTS 
      // Users
      usersPost(path: string, body: Object = {}): Observable<any> {
        console.log(JSON.stringify(body));
        return this.http.post(
          `${environment.api_go_users}${path}`,body
        ).pipe(catchError(this.formatErrors));
      }

      usersGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_go_users}${path}`, { params })
          .pipe(catchError(this.formatErrors));
      }

      usersCheckToken(path: string, token: String): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);

        return this.http.get(`${environment.api_go_users}${path}`,{headers})
          .pipe(catchError(this.formatErrors));
      }

      //Login laravel
      loginLaravel(path: String, body: Object = {}): Observable<any> {
        console.log("PATH ",`${environment.api_laravel}${path}`)
        return this.http.post(`${environment.api_laravel}${path}`, { body })
          .pipe(catchError(this.formatErrors));
      }

      // Discotecas
      discotecasGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_go_discotecas}${path}`, { params })
          .pipe(catchError(this.formatErrors));
      }

      // Events
    

      // Other
      put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
          `${environment.api_go_users}${path}`,
          JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
      }
    
      delete(path: Observable<any>) {                //Originalmente estaba asi: delete(path): Observable<any>
        return this.http.delete(                     //Pero no pilla el tipo de path al ser tipado y salta error
          `${environment.api_go_users}${path}`
        ).pipe(catchError(this.formatErrors));
      }
}