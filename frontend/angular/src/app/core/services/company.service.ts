import { Injectable, ɵConsole } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Company } from '../models';
import { JwtService } from './jwt.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }

    createCompany(data: []): Observable<Company> {
        return this.apiService.postLaravel('/company', data)
            .pipe(map(
                data => {
                    console.log("pepe");
                    console.log(data);
                    return data;
                }
            ));
    }
}