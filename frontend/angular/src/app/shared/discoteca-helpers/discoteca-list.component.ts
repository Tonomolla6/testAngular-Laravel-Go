import { Component, Input } from '@angular/core';

import { Discoteca, DiscotecaListConfig, DiscotecasService } from '../../core';

@Component({
    selector: 'app-discoteca-list',
    styleUrls: ['discoteca-list.component.css'],
    templateUrl: './discoteca-list.component.html'
  })
  export class DiscotecaListComponent {
    
    constructor (
      private discotecasService: DiscotecasService
    ) {
      //Declarar las variables aqui??
      // this.query=Object[];
    }
    @Input() limit: number;
    @Input()
    set config(config: DiscotecaListConfig) {
      console.log("Dentro del set config discotecaListConfig");
      if (config) {
        this.query = config;
        this.currentPage = 1;
        this.runQuery();
      }
    }
  
    query: DiscotecaListConfig;
    results: Discoteca[];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];
  
    
  
    runQuery() {
      console.log("Dentro del run query del discoteca list config");
      this.loading = true;
      this.results = [];
  
      // Create limit and offset filter (if necessary)
      if (this.limit) {
        this.query.filters.limit = this.limit;
        this.query.filters.offset =  (this.limit * (this.currentPage - 1));
      }
  
      console.log("Antes del query");
      this.discotecasService.query(this.query)
      .subscribe(data => {
        console.log("DATA");
        console.log(data);
        this.loading = false;
        this.results = data.discotecas;
  
        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.discotecasCount / this.limit)), (val, index) => index + 1);
      });
    }
  }