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
        console.log(JSON.stringify(body));
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

        console.log("hola");
        return this.http.get(`${environment.api_go_users}${path}`,{headers})
          .pipe(catchError(this.formatErrors));
      }

      // Laravel
      loginLaravel(path: String, body: Object = {}): Observable<any> {
        console.log("PATH ",`${environment.api_laravel}${path}`)
        console.log(JSON.stringify(body))
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
        console.log("dataaaaaa api service");
        console.log(data)
        // console.log(this.jwtService.getToken())
        // console.log(`${environment.api_go_discotecas}${path}`)

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        headers = headers.set('Content-Type','application/json' );
        headers = headers.set('Accept', 'application/json');
        let options = {headers: headers}; //, params: data
       

        console.log(options)
        console.log("DATA antes de enviar")
        console.log(typeof(data))
        // let discoteca : Discoteca ;
        // discoteca = new Discoteca;
        // discoteca.name="prueba";
        
        // console.log(discoteca)

        // console.log("discoteca");
        // console.log({discoteca})
        console.log(options)
        // console.log(`${environment.api_go_discotecas}${path}`)
        return this.http.post<Object>(`${environment.api_go_discotecas}${path}`, data , options)
        .pipe(catchError(this.formatErrors));
      }


      discotecasFavorite(path: string): Observable<any> {
        let prueba = "prueba";

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        let options = {headers: headers};

        console.log(options);

        return this.http.post(`${environment.api_go_discotecas}${path}`, {prueba}, options)
        .pipe(catchError(this.formatErrors));
      }

      // Profile
      getProfile(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        console.log("headers del get profile");
        console.log(headers);
        
        return this.http.get(`${environment.api_go_profile}${path}`, { headers })
          .pipe(catchError(this.formatErrors));
      }

      setProfile(path: string): Observable<any> {
        let profile = {
          name:"",
          surname:"",
          description: "",
          bio: ""
        }

        console.log(profile);
        let token = this.jwtService.getToken();
        console.log(token);
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);
        let options = {headers: headers};

        console.log(options);

        console.log(`${environment.api_go_profile}${path}`);
        console.log(options);
        
        return this.http.post(`${environment.api_go_profile}${path}`, {profile}, options)
        .pipe(catchError(this.formatErrors));
      }

      // Reports
      gerReports(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());
        console.log(headers);
        
        return this.http.get(`${environment.api_laravel}${path}`, { headers })

      }
      
      updateProfile(path: string, data: Object,  params: HttpParams = new HttpParams()): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getToken());

        console.log("DATA antes de enviar: ",data)
        console.log("HEADERS antes de enviar: ",headers)
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