import { Component, OnInit, Input } from '@angular/core';
// import { BuyProduct, BuysProducts } from '../../core';
import { Discoteca, DiscotecaListConfig, DiscotecasService } from '../../core';


@Component({
  selector: 'app-discoteca',
  templateUrl: './discoteca.component.html',
  styleUrls: ['./discoteca.component.css']
})
export class DiscotecaComponent implements OnInit {
  constructor(
    private discotecasService: DiscotecasService) { }
    discoArray = [];

  ngOnInit() {
     this.discoArray = [];
    console.log('Entra en el oninit');
    this.discotecasService.query().subscribe(data => {
      this.discoArray = data;
      console.log(this.discoArray,'products laravel');
    })
  }

}