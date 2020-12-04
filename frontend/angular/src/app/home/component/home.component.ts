import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',  //Aqui está cargando el html, y lo carga del tiron, no se espera a nadie
  styleUrls: ['./home.component.css']   //Igual con el css
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
