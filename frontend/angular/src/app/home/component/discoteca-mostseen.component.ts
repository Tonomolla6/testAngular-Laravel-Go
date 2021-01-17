import { Component, OnInit } from '@angular/core';
import {
  Discoteca,
  DiscotecasService
} from '../../core';

@Component({
  selector: 'app-discoteca-mostseen',
  templateUrl: './discoteca-mostseen.component.html',
  styleUrls: ['./discoteca-mostseen.component.css']
})
export class DiscotecaMostseenComponent implements OnInit {

  constructor(    private discotecasService:DiscotecasService,
    ) { }

  results!: Discoteca[]

  ngOnInit(): void {
    this.discotecasService.query().subscribe(data => { 
      this.results = data.discotecas.filter((element, index) => index < 3);
    });
  }

}
