import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


import {
  Discoteca,
  DiscotecasService
} from '../../core';

@Component({
  selector: 'app-discoteca',
  templateUrl: './discoteca.component.html',
  styleUrls: ['./discoteca.component.css']
})
export class DiscotecaComponent implements OnInit {
  @Input()
  // discoteca: Discoteca | undefined; //Le ponemos undefined porque al declarar la variable fuera del constructor hay que rellenarla, y al no tener ningun dato le ponemos undefined
  discoteca!: Discoteca;  //Le ponemos "!"  para indicarle al compilador que esta linea está bien y no tiene que saltar error, porque a veces aunque esté bien la sintaxi salta error por cosas del typescript (creo)
  results!:Discoteca[];


  constructor(
    private route:ActivatedRoute,
    private discotecasService:DiscotecasService,
    private router:Router,
  ) {}
  

  // runQuery() {
  //   console.log("Dentro del run query del discoteca component");

  //   this.discotecasService.query().subscribe(data => {
  //     console.log("DATA del discoteca component");
  //     console.log(data);
      
  //     this.results = data.discoteca;
  //   });
  // }

  ngOnInit(): void { //En el oninit solo va el retrieve, que es para coger las discotecas que tenemos (listDiscotecas)
    // Retreive the prefetched article
    // this.route.data.subscribe(   (data: {discoteca: Discoteca }) => {
    //     this.discoteca = data.discoteca;
      // });
      console.log("NGONINIIIIIT")
      this.discotecasService.query().subscribe(data => {
        console.log("DATA del discoteca component");
        console.log(data);
        this.results = data.discoteca;
      });

      
  }
  //Aqui irá el delete, update, comments, favorited...

}
