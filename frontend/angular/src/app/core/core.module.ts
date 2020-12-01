import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
console.log("OLAAAAAA core module");
import {
    ApiService,
    DiscotecasService

  } from './services';

  @NgModule({
    imports: [
      CommonModule
    ],
    providers: [
    //   { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
      ApiService,
      DiscotecasService
    ],
    declarations: []
  })
  export class CoreModule { }