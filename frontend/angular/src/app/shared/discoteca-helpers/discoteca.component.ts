import { Component, OnInit, Input } from '@angular/core';
import { Discoteca, DiscotecasService } from '../../core';

@Component({
  selector: 'app-discotecas',
  templateUrl: './discoteca.component.html',
  styleUrls: ['./discoteca.component.css']
})
export class DiscotecasComponent implements OnInit {

  constructor(
    private discotecasService: DiscotecasService,
    private results: Discoteca[]
  ) {

  }

  // results: Discoteca[];

  ngOnInit() {
    this.results = [];
    this.discotecasService.query().subscribe(data => {

      this.results = data;
    })
  }

}