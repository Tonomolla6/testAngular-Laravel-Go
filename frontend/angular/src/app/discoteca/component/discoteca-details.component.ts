// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { DiscotecaPreviewComponent } from './discoteca-preview.component';

// import {
//   Discoteca,
//   DiscotecasService
// } from '../../core';

// @Component({
//   selector: 'app-discoteca',
//   templateUrl: './discoteca.component.html',
//   styleUrls: ['./discoteca.component.css']
// })
// export class DiscotecaDetailsComponent implements OnInit {
//   @Input()
//   // discoteca: Discoteca | undefined; //Le ponemos undefined porque al declarar la variable fuera del constructor hay que rellenarla, y al no tener ningun dato le ponemos undefined
//   discoteca!: Discoteca;  //Le ponemos "!"  para indicarle al compilador que esta linea está bien y no tiene que saltar error, porque a veces aunque esté bien la sintaxi salta error por cosas del typescript (creo)
//   // results!: Discoteca[];

//   constructor(
//     private route:ActivatedRoute,
//     private discotecasService:DiscotecasService,
//     private router:Router,
//   ) {}
  

//   ngOnInit(): void { //En el oninit solo va el retrieve, que es para coger las discotecas que tenemos (listDiscotecas)
//     // Retreive the prefetched article
//     console.log("ON INIT DEL DETAILS--------------");

//       // Retreive the prefetched article
//     // this.route.data.subscribe(
//     //   (data: { discoteca: Discoteca }) => {
//     //     this.discoteca = data.discoteca;

//     //     // Load the comments on this article
//     //     // this.populateComments();
//     //   }
//     // );

      

      
//   }


// }
