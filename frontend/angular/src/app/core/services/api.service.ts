import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

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

  //Hacer aqui lo del cors ***
  get(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })): Observable<any> {

    headers= new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',  //http://localhost:4200
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    
    })


    console.log("HEADERS del get api service");
    console.log(headers);
    // let prueba=this.http.get(`${environment.api_url}${path}`, { params: params, headers: headers })
    // .pipe(catchError(this.formatErrors));
    // console.log("PRUEBA api service");
    // console.log(prueba);
    // return prueba;
    return this.http.get(`${environment.api_url}${path}`, { params: params, headers: headers })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
