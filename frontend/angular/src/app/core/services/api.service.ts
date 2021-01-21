import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable ,  throwError } from 'rxjs';
import {Discoteca} from '../models/discoteca.model';
import {Profile} from '../models/profile.model'

import { JwtService } from './jwt.service'; 
import { catchError } from 'rxjs/operators';
@Injectable()

export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService
      ) {}

      private formatErrors(error: any) {
        return  throwError(error.error);
      }

      // ENDPOINTS 
      // Users
      usersPost(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
          `${environment.api_go_users}${path}`,body
        ).pipe(catchError(this.formatErrors));
      }

      usersGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_go_users}${path}`, { params })
          .pipe(catchError(this.formatErrors));
      }

      usersCheckToken(path: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());

        return this.http.get(`${environment.api_go_users}${path}`,{headers})
          .pipe(catchError(this.formatErrors));
      }

      // Laravel
      loginLaravel(path: String, body: Object = {}): Observable<any> {
        return this.http.post(`${environment.api_laravel}${path}`, body)
          .pipe(catchError(this.formatErrors));
      }

      postLaravel(path: String, body: Object = {}): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getAdminToken());
        let options = {headers: headers};

        return this.http.post(`${environment.api_laravel}${path}`, body , options)
          .pipe(catchError(this.formatErrors));
      }

      // Discotecas
      discotecasGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        let options = {headers: headers};

        return this.http.get(`${environment.api_go_discotecas}${path}`,options )
          .pipe(catchError(this.formatErrors));
      }

      discotecasPost(path: string, data: Discoteca): Observable<any> {


        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        headers = headers.set('Content-Type','application/json' );
        headers = headers.set('Accept', 'application/json');
        let options = {headers: headers}; //, params: data

        return this.http.post<Object>(`${environment.api_go_discotecas}${path}`, data , options)
        .pipe(catchError(this.formatErrors));
      }


      discotecasFavorite(path: string): Observable<any> {
        let prueba = "prueba";

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        let options = {headers: headers};

        return this.http.post(`${environment.api_go_discotecas}${path}`, {prueba}, options)
        .pipe(catchError(this.formatErrors));
      }

      // Profile
      getProfile(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        
        return this.http.get(`${environment.api_go_profile}${path}`, { headers })
          .pipe(catchError(this.formatErrors));
      }

      setProfile(path: string): Observable<any> {
        let profile = {
          name:"name",
          surname:"surname",
          description: "description",
          bio: "bio"
        }

        let token = this.jwtService.getToken();
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);
        let options = {headers: headers};

        console.log("ANTES DE CREAR el profile del user acabado de registrar")
        console.log(`${environment.api_go_profile}${path}`)
        console.log(token)
        return this.http.post(`${environment.api_go_profile}${path}`, profile, options)
        .pipe(catchError(this.formatErrors));
      }

      // Reports
      getReports(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getAdminToken());
        console.log(headers);
        
        return this.http.get(`${environment.api_laravel}${path}`, { headers })
      }

      //Get all companies
      getAllCompanies(path: string, params: HttpParams = new HttpParams()): Observable<any> {

        // path = "http://localhost:8000/api/companies"
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getAdminToken());

        return this.http.get(`${environment.api_laravel}${path}`, { headers })

      }
      
      updateProfile(path: string, data: Object,  params: HttpParams = new HttpParams()): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());

        return this.http.put(`${environment.api_go_profile}${path}`,data, { headers })
          .pipe(catchError(this.formatErrors));
      }

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