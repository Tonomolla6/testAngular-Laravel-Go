import { Component, OnInit } from '@angular/core';
// For MDB Angular Free
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {A11yModule} from '@angular/cdk/a11y';
// import { ToastrService } from 'ngx-toastr';
import { Injector } from '@angular/core';



Injector
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',  //Aqui está cargando el html, y lo carga del tiron, no se espera a nadie
  styleUrls: ['./home.component.css']   //Igual con el css
})
export class HomeComponent implements OnInit {

  constructor(
    // private toastr: ToastrService,
  ) { }

  // showSuccess() {
    // this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  ngOnInit(): void {

    // this.showSuccess();
  }

}
